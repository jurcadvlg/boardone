import { Prices } from '@/prices';
import { isWinterSeason } from './isWinterSeason';
import { Config } from '@/config';

const WINTER_SEASON_DISCOUNT = (100 - Config.calculation.winterSeasonDiscountPercent) / 100;

export function getTripPrice(
  distance: number,
  duration: number,
  waitTime: number,
  paidWaitingTime: number,
  passengers: number,
  direction: string,
  tripStartDate?: Date | null,
  tripEndDate?: Date | null
): number | null {
  let price: number | null = null;

  switch (direction) {
    default:
    case 'oneway':
      price = getOnewayPrice(distance, paidWaitingTime, passengers);
      break;
    case 'roundtrip':
      price = getRoundtripPrice(distance, duration + waitTime, passengers);
      break;
  }

  if (tripStartDate && tripEndDate && price) {
    if (isWinterSeason(tripStartDate) && isWinterSeason(tripEndDate)) {
      price = price * WINTER_SEASON_DISCOUNT;
    }
  }

  return price;
}

function getRoundtripPrice(distance: number, time: number, passengers: number): number | null {
  // Filter prices array for matching entries
  const matchingEntries = Prices.roundtrip.filter(
    (entry) => entry.maxDistanceInKm >= distance && entry.maxTimeInHours >= time
  );

  if (matchingEntries.length === 0) return null;

  // Sort matching entries by maxDistanceInKm and maxTimeInHours to get the closest match
  matchingEntries.sort((a, b) => a.maxDistanceInKm - b.maxDistanceInKm || a.maxTimeInHours - b.maxTimeInHours);

  // Get the closest match
  const closestMatch = matchingEntries[0];

  // Find the price for the given number of passengers
  const closestPriceEntry = closestMatch.pricesByPassengers.find((entry) => entry.passengers >= passengers);

  if (!closestPriceEntry) return null;

  return closestPriceEntry.price;
}

function getOnewayPrice(distance: number, waitTime: number, passengers: number): number | null {
  // Filter prices array for matching entries
  const matchingEntries = Prices.oneway.filter((entry) => entry.maxDistanceInKm >= distance);

  if (matchingEntries.length === 0) return null;

  // Sort matching entries by maxDistanceInKm to get the closest match
  matchingEntries.sort((a, b) => a.maxDistanceInKm - b.maxDistanceInKm);

  // Get the closest match
  const closestMatch = matchingEntries[0];

  // Find the price for the given number of passengers
  const closestPriceEntry = closestMatch.pricesByPassengers.find((entry) => entry.passengers >= passengers);

  if (!closestPriceEntry) return null;

  // Waiting prices
  const matchingWaitingPrices = Prices.waiting.filter((entry) => entry.passengers >= passengers);

  if (matchingWaitingPrices.length === 0) return null;

  matchingWaitingPrices.sort((a, b) => a.passengers - b.passengers);

  const waitingPrice = matchingWaitingPrices[0].price * waitTime;

  return closestPriceEntry.price + waitingPrice;
}
