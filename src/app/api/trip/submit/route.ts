import { TripFormValues } from '@/app/(home)/_components/_hooks/useTripForm';
import to from '@/utils/awaitTo';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const data: TripFormValues & { distance: string } = await req.json();

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

  const text = `
    Poptávka autobusové dopravy\n\n
    Z: ${data.origin} - odjezd ${data.timeStart}\n
    Do: ${data.destination} - příjezd ${data.timeArrival}\n
    Zastávky:\n
    ${data.waypoint1}\n
    ${data.waypoint2}\n
    ${data.waypoint3}\n
    ${data.waypoint4}\n
    ${data.waypoint5}\n
    Dělka trasy: ${data.distance}\n\n
    Objednavatel:\n
    Jméno: ${data.firstName} ${data.lastName}\n
    Telefon: ${data.phoneNumber}\n
    Email: ${data.email}\n
  `;

  const html = `
    <h1>Poptávka autobusové dopravy</h1>
    <h2>Cesta</h2>
    <p>Z: ${data.origin} - odjezd ${data.timeStart}</p>
    <p>Do: ${data.destination} - příjezd ${data.timeArrival}</p>
    <p>Zastávky:</p>
    <p>${data.waypoint1}</p>
    <p>${data.waypoint2}</p>
    <p>${data.waypoint3}</p>
    <p>${data.waypoint4}</p>
    <p>${data.waypoint5}</p>
    <p>Délka trasy: ${data.distance}</p>

    <h2>Objednavatel</h2>
    <p>Jméno: ${data.firstName} ${data.lastName}</p>
    <p>Telefon: ${data.phoneNumber}</p>
    <p>Email: ${data.email}</p>
    `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'BoardOne - Poptávka',
    text: text,
    html: html,
  };

  const [error, response] = await to(transporter.sendMail(mailOptions));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(response, { status: 200 });
}
