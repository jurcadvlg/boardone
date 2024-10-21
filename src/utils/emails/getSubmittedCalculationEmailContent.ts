import { SubmitDto } from '@/app/(home)/_components/StepSubmit/hooks/useStepSubmit';
import { formatTime } from '../formatTime';

type RouteDestination = {
  address: string;
  arrivalDate?: Date | null;
  departureDate?: Date | null;
};

export function getSubmittedCalculationEmailContent(data: SubmitDto) {
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
    BoardOne - Závazná poptávka autobusové dopravy\n\n
    Dobrý den,\n\n
    děkujeme, že jste se rozhodli využít služeb BoardOne. Toto je závazná poptávka autobusové dopravy. Náš tým začal dopravu organizovat a současně připravuje fakturu. Tu Vám zašleme v následujících dnech na uvedené kontaktní údaje.\n\n
    Těším se na spolupráci\n
    Tým BoardOne\n\n
    Vaše poptávka\n
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
    Naše nabídka:\n
    Vzdálenost: ${Math.round(data.calculation.distance)} km\n
    Délka: ${formatTime(data.calculation.duration)}\n
    Cena: ${data.calculation.individualCalculation ? 'Individuální kalkulace' : data.calculation.price?.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}\n\n
    Kontaktní údaje:\n
    Jméno: ${data.formData.firstName} ${data.formData.lastName}\n
    Telefon: ${data.formData.phoneNumber}\n
    Email: ${data.formData.email}\n
    Poznámka: ${data.formData.note}\n\n
    -----------\n\n
    Tým BoardOne\n
    https://boardone.io\n
    +420 770 103 175\n
  `;

  const html = `
    <h1>BoardOne - Závazná poptávka autobusové dopravy</h1>
    <p>Dobrý den,</p>
    <p>děkujeme, že jste se rozhodli využít služeb BoardOne. Toto je závazná poptávka autobusové dopravy. Náš tým začal dopravu organizovat a současně připravuje fakturu. Tu Vám zašleme v následujících dnech na uvedené kontaktní údaje.</p>
    <p>
    Těším se na spolupráci,
    <br />
    Tým BoardOne
    </p>
    <br />
    <h2 style="color: #2196F3;">Vaše poptávka</h2>
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
    <h2 style="color: #2196F3;">Naše nabídka</h2>
    <p>Vzdálenost: <strong>${Math.round(data.calculation.distance)} km</strong></p>
    <p>Délka: <strong>${formatTime(data.calculation.duration)}</strong></p>
    <p>Cena: <strong>${data.calculation.individualCalculation ? 'Individuální kalkulace' : data.calculation.price?.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}</strong></p>
    <br />
    <h2 style="color: #2196F3;">Kontaktní údaje</h2>
    <p>Jméno: <strong>${data.formData.firstName} ${data.formData.lastName}</strong></p>
    <p>Telefon: <strong>${data.formData.phoneNumber}</strong></p>
    <p>Email: <strong>${data.formData.email}</strong></p>
    <p>Poznámka: <strong>${data.formData.note}</strong></p>
    <br />
    <p>-----------</p>
    <p>
    Tým BoardOne<br />
    <a href="https://boardone.io">boardone.io</a><br />
    +420 770 103 175<br />
    </p>
  `;

  return { text, html };
}
