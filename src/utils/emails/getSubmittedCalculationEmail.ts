import { SubmitDto } from '@/app/(home)/_components/StepSubmit/hooks/useStepSubmit';
import { formatTime } from '../formatTime';

type RouteDestination = {
  address: string;
  arrivalDate?: Date | null;
  departureDate?: Date | null;
};

export function getSubmittedCalculationEmail(data: SubmitDto, subject: string) {
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
    to: data.formData.email || process.env.EMAIL_USER,
    bcc: process.env.EMAIL_USER,
    subject: subject,
    text: text,
    html: html,
  };

  return mailOptions;
}
