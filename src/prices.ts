const RoundtripPrices = [
  {
    maxDistanceInKm: 80,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 4628 },
      { passengers: 7, price: 5348 },
      { passengers: 18, price: 7521 },
      { passengers: 30, price: 11329 },
      { passengers: 49, price: 12566 },
      { passengers: 59, price: 15422 },
      { passengers: 78, price: 20468 },
    ],
  },
  {
    maxDistanceInKm: 120,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 4731 },
      { passengers: 7, price: 5862 },
      { passengers: 18, price: 8282 },
      { passengers: 30, price: 13042 },
      { passengers: 49, price: 14470 },
      { passengers: 59, price: 16946 },
      { passengers: 78, price: 23419 },
    ],
  },
  {
    maxDistanceInKm: 140,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 5040 },
      { passengers: 7, price: 6068 },
      { passengers: 18, price: 9044 },
      { passengers: 30, price: 14090 },
      { passengers: 49, price: 15613 },
      { passengers: 59, price: 18088 },
      { passengers: 78, price: 25038 },
    ],
  },
  {
    maxDistanceInKm: 120,
    maxTimeInHours: 9,
    pricesByPassengers: [
      { passengers: 3, price: 6891 },
      { passengers: 7, price: 8434 },
      { passengers: 18, price: 10662 },
      { passengers: 30, price: 18850 },
      { passengers: 49, price: 20849 },
      { passengers: 59, price: 26180 },
      { passengers: 78, price: 31987 },
    ],
  },
  {
    maxDistanceInKm: 300,
    maxTimeInHours: 12,
    pricesByPassengers: [
      { passengers: 3, price: 7714 },
      { passengers: 7, price: 10799 },
      { passengers: 18, price: 12662 },
      { passengers: 30, price: 21039 },
      { passengers: 49, price: 23324 },
      { passengers: 59, price: 28370 },
      { passengers: 78, price: 36557 },
    ],
  },
  {
    maxDistanceInKm: 400,
    maxTimeInHours: 12,
    pricesByPassengers: [
      { passengers: 3, price: 8125 },
      { passengers: 7, price: 11314 },
      { passengers: 18, price: 13804 },
      { passengers: 30, price: 22277 },
      { passengers: 49, price: 24752 },
      { passengers: 59, price: 30274 },
      { passengers: 78, price: 38556 },
    ],
  },
];

const OnewayPrices = [
  {
    maxDistanceInKm: 30,
    pricesByPassengers: [
      { passengers: 3, price: 1491 },
      { passengers: 7, price: 2366 },
      { passengers: 18, price: 3475 },
      { passengers: 30, price: 4617 },
      { passengers: 49, price: 5141 },
      { passengers: 59, price: 5902 },
      { passengers: 78, price: 8616 },
    ],
  },
  {
    maxDistanceInKm: 80,
    pricesByPassengers: [
      { passengers: 3, price: 4628 },
      { passengers: 7, price: 5760 },
      { passengers: 18, price: 7330 },
      { passengers: 30, price: 10853 },
      { passengers: 49, price: 11995 },
      { passengers: 59, price: 14470 },
      { passengers: 78, price: 19230 },
    ],
  },
  {
    maxDistanceInKm: 120,
    pricesByPassengers: [
      { passengers: 3, price: 7097 },
      { passengers: 7, price: 8434 },
      { passengers: 18, price: 10186 },
      { passengers: 30, price: 15613 },
      { passengers: 49, price: 17326 },
      { passengers: 59, price: 21134 },
      { passengers: 78, price: 27418 },
    ],
  },
  {
    maxDistanceInKm: 140,
    pricesByPassengers: [
      { passengers: 3, price: 7302 },
      { passengers: 7, price: 9154 },
      { passengers: 18, price: 10948 },
      { passengers: 30, price: 16660 },
      { passengers: 49, price: 18564 },
      { passengers: 59, price: 23705 },
      { passengers: 78, price: 31321 },
    ],
  },
  {
    maxDistanceInKm: 200,
    pricesByPassengers: [
      { passengers: 3, price: 7714 },
      { passengers: 7, price: 10696 },
      { passengers: 18, price: 13899 },
      { passengers: 30, price: 21420 },
      { passengers: 49, price: 23705 },
      { passengers: 59, price: 30369 },
      { passengers: 78, price: 38556 },
    ],
  },
];

const HourWaitingPrices = [
  { passengers: 3, price: 514 },
  { passengers: 7, price: 720 },
  { passengers: 18, price: 857 },
  { passengers: 30, price: 1238 },
  { passengers: 49, price: 1428 },
  { passengers: 59, price: 1618 },
  { passengers: 78, price: 2666 },
];

export const Prices = {
  roundtrip: RoundtripPrices,
  oneway: OnewayPrices,
  waiting: HourWaitingPrices,
};
