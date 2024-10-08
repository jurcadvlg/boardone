import { TripFormValues } from '@/app/(home)/_components/hooks/useTripForm';
import to from '@/utils/awaitTo';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Calculation } from '../calculate/route';
import { formatTime } from '@/utils/formatTime';

type RouteDestination = {
  address: string;
  arrivalDate?: Date | null;
  departureDate?: Date | null;
};

export async function POST(req: NextRequest) {
  const data: {
    formData: TripFormValues;
    calculation: Calculation;
  } = await req.json();

  if (!data) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const origin = data.calculation.routes[0].from!;
  const destination = data.calculation.routes[data.calculation.routes.length - 1].to!;
  const originDepartureDate = origin.departureDate ? new Date(origin.departureDate).toLocaleString('cs-CZ') : '';
  const destinationArrivalDate = destination.arrivalDate
    ? new Date(destination.arrivalDate).toLocaleString('cs-CZ')
    : '';

  let waypoints: RouteDestination[] = [];
  if (data.calculation.routes && data.calculation.routes.length > 1) {
    waypoints = data.calculation.routes.slice(0, -1).map((route) => route.to);
  }

  const text = `
    BoardOne - Poptávka autobusové dopravy\n\n
    Počet cestujících: ${data.calculation.passengers}\n
    Jízda: ${data.formData.direction === 'roundtrip' ? 'zpáteční' : 'jednosměrná'}\n
    Z: ${origin.address} - odjezd ${originDepartureDate}\n
    Do: ${destination.address} - příjezd ${destinationArrivalDate}\n
    Zastávky:\n
    ${waypoints
      .map((w) => {
        return `${w.address} - odjezd ${w.departureDate ? new Date(w.departureDate).toLocaleString('cs-CZ') : ''} - příjezd ${w.arrivalDate ? new Date(w.arrivalDate).toLocaleString('cs-CZ') : ''}`;
      })
      .join('\n')}\n\n
    Kalkulace:\n
    Vzdálenost: ${Math.round(data.calculation.distance)} km\n
    Délka: ${formatTime(data.calculation.duration ?? 0)}\n
    Cena: ${data.calculation.individualCalculation ? 'Individuální kalkulace' : data.calculation.price?.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}\n\n
    Objednavatel:\n
    Jméno: ${data.formData.firstName} ${data.formData.lastName}\n
    Telefon: ${data.formData.phoneNumber}\n
    Email: ${data.formData.email}\n
  `;

  const html = `
    <h1>BoardOne - Poptávka autobusové dopravy</h1>
    <h2 style="color: #2196F3;">Poptávka</h2>
    <p>Počet cestujících: <strong>${data.calculation.passengers}</strong></p>
    <p>Jízda: <strong>${data.formData.direction === 'roundtrip' ? 'zpáteční' : 'jednosměrná'}</strong></p>
    <p>Z: <strong>${origin.address}</strong> - odjezd <strong>${originDepartureDate}</strong></p>
    <p>Do: <strong>${destination.address}</strong> - příjezd <strong>${destinationArrivalDate}</strong></p>
    <h3>Zastávky:</h3>
    <ul>
      ${waypoints
        .map((w) => {
          return `<li><strong>${w.address}</strong> - příjezd <strong>${w.arrivalDate ? new Date(w.arrivalDate).toLocaleString('cs-CZ') : ''}</strong> - odjezd <strong>${w.departureDate ? new Date(w.departureDate).toLocaleString('cs-CZ') : ''}</strong> </li>`;
        })
        .join('')}
    </ul>
    <br />
    <h2 style="color: #2196F3;">Kalkulace</h2>
    <p>Vzdálenost: <strong>${Math.round(data.calculation.distance)} km</strong></p>
    <p>Délka: <strong>${formatTime(data.calculation.duration ?? 0)}</strong></p>
    <p>Cena: <strong>${data.calculation.individualCalculation ? 'Individuální kalkulace' : data.calculation.price?.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}</strong></p>
    <br />
    <h2 style="color: #2196F3;">Objednavatel</h2>
    <p>Jméno: <strong>${data.formData.firstName} ${data.formData.lastName}</strong></p>
    <p>Telefon: <strong>${data.formData.phoneNumber}</strong></p>
    <p>Email: <strong>${data.formData.email}</strong></p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER + ', ' + data.formData.email,
    subject: 'BoardOne - Uložená poptávka',
    text: text,
    html: html,
  };

  const [error, response] = await to(transporter.sendMail(mailOptions));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(response, { status: 200 });
}
