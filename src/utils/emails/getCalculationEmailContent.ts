import { SubmitDto } from '@/app/(home)/_components/StepSubmit/hooks/useStepSubmit';
import { formatTime } from '../formatTime';

type RouteDestination = {
  address: string;
  arrivalDate?: Date | null;
  departureDate?: Date | null;
};

export function getCalculationEmailContent(data: SubmitDto) {
  const origin = data.calculation.routes[0].from!;
  const destination = data.calculation.routes[data.calculation.routes.length - 1].to!;
  const originDepartureDate = origin.departureDate
    ? new Date(origin.departureDate).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
    : '';
  const destinationArrivalDate = destination.arrivalDate
    ? new Date(destination.arrivalDate).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
    : '';

  let waypoints: RouteDestination[] = [];
  if (data.calculation.routes && data.calculation.routes.length > 1) {
    waypoints = data.calculation.routes.slice(0, -1).map((route) => route.to);
  }

  const text = `
    BoardOne - Kalkulace autobusové dopravy\n\n
    Datum kalkulace: ${new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })}\n\n
    Poptávka\n
    Počet cestujících: ${data.calculation.passengers}\n
    Jízda: ${data.formData.direction === 'roundtrip' ? 'zpáteční' : 'jednosměrná'}\n
    Z: ${origin.address} - odjezd ${originDepartureDate}\n
    Do: ${destination.address} - příjezd ${destinationArrivalDate}\n
    Zastávky:\n
    ${waypoints
      .map((w) => {
        const departureDate = w.departureDate
          ? new Date(w.departureDate).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
          : '';
        const arrivalDate = w.arrivalDate
          ? new Date(w.arrivalDate).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
          : '';
        return `${w.address} - příjezd ${arrivalDate} - odjezd ${departureDate}`;
      })
      .join('\n')}\n\n
    Nabídka:\n
    Vzdálenost: ${Math.round(data.calculation.distance)} km\n
    Délka: ${formatTime(data.calculation.duration)}\n
    Cena: ${data.calculation.individualCalculation ? 'Individuální kalkulace' : data.calculation.price?.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}\n\n
  `;

  const html = `
    <h1>BoardOne - Kalkulace autobusové dopravy</h1>
    <p>Datum kalkulace: <strong>${new Date().toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })}</strong></p>
    <h2 style="color: #2196F3;">Poptávka</h2>
    <p>Počet cestujících: <strong>${data.calculation.passengers}</strong></p>
    <p>Jízda: <strong>${data.formData.direction === 'roundtrip' ? 'zpáteční' : 'jednosměrná'}</strong></p>
    <p>Z: <strong>${origin.address}</strong> - odjezd <strong>${originDepartureDate}</strong></p>
    <p>Do: <strong>${destination.address}</strong> - příjezd <strong>${destinationArrivalDate}</strong></p>
    <h3>Zastávky:</h3>
    <ul>
      ${waypoints
        .map((w) => {
          const departureDate = w.departureDate
            ? new Date(w.departureDate).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
            : '';
          const arrivalDate = w.arrivalDate
            ? new Date(w.arrivalDate).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })
            : '';
          return `<li><strong>${w.address}</strong> - příjezd <strong>${arrivalDate}</strong> - odjezd <strong>${departureDate}</strong> </li>`;
        })
        .join('')}
    </ul>
    <br />
    <h2 style="color: #2196F3;">Nabídka</h2>
    <p>Vzdálenost: <strong>${Math.round(data.calculation.distance)} km</strong></p>
    <p>Délka: <strong>${formatTime(data.calculation.duration)}</strong></p>
    <p>Cena: <strong>${data.calculation.individualCalculation ? 'Individuální kalkulace' : data.calculation.price?.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}</strong></p>
  `;

  return { text, html };
}
