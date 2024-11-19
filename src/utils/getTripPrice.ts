import { Prices } from '@/prices';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isWinterSeason } from './isWinterSeason';
import { Config } from '@/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WINTER_SEASON_DISCOUNT = (100 - Config.calculation.winterSeasonDiscountPercent) / 100;
const BOARDONE_MARGIN = 1.1;

export function getTripPrice(
  distance: number,
  duration: number,
  waitTime: number,
  paidWaitingTime: number,
  passengers: number,
  direction: string,
  isDepartureFromPrague: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tripStartDate?: Date | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tripEndDate?: Date | null
): number | null {
  let price: number | null = null;

  switch (direction) {
    default:
    case 'oneway':
      price = calculatePrice(distance * 2, paidWaitingTime, passengers, isDepartureFromPrague);
      break;
    case 'roundtrip':
      price = calculatePrice(distance, paidWaitingTime, passengers, isDepartureFromPrague);
      break;
  }

  // if (tripStartDate && tripEndDate && price) {
  //   if (isWinterSeason(tripStartDate) && isWinterSeason(tripEndDate)) {
  //     price = price * WINTER_SEASON_DISCOUNT;
  //   }
  // }

  return price;
}

function calculatePrice(distance: number, waitTime: number, passengers: number, isDepartureFromPrague: boolean) {
  const matchingEntries = Prices.filter((entry) => entry.passengers >= passengers);

  if (matchingEntries.length === 0) return null;
  matchingEntries.sort((a, b) => a.passengers - b.passengers);
  const closestMatch = matchingEntries[0];

  const distancePrice = closestMatch.pricePerKm * distance;
  const waitingPrice = closestMatch.waitingPricePerHour * waitTime;

  let price = distancePrice + waitingPrice;

  // Add 10 % for Prague
  if (isDepartureFromPrague) {
    price = price * 1.1;
  }

  // Add BoardOne margin
  price = price * BOARDONE_MARGIN;

  // Round price
  price = Math.round(price / 100) * 100;

  if (price < closestMatch.minPrice) {
    price = closestMatch.minPrice;
  }

  return price;
}
