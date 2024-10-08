const RoundtripPrices = [
  {
    maxDistanceInKm: 80,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 5040 },
      { passengers: 7, price: 5824 },
      { passengers: 18, price: 9559 },
      { passengers: 30, price: 14399 },
      { passengers: 49, price: 15972 },
      { passengers: 59, price: 19602 },
      { passengers: 78, price: 26015 },
    ],
  },
  {
    maxDistanceInKm: 120,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 5152 },
      { passengers: 7, price: 6384 },
      { passengers: 18, price: 10527 },
      { passengers: 30, price: 16577 },
      { passengers: 49, price: 18392 },
      { passengers: 59, price: 21538 },
      { passengers: 78, price: 29766 },
    ],
  },
  {
    maxDistanceInKm: 140,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 5488 },
      { passengers: 7, price: 6608 },
      { passengers: 18, price: 11495 },
      { passengers: 30, price: 17908 },
      { passengers: 49, price: 19844 },
      { passengers: 59, price: 22990 },
      { passengers: 78, price: 31823 },
    ],
  },
  {
    maxDistanceInKm: 120,
    maxTimeInHours: 9,
    pricesByPassengers: [
      { passengers: 3, price: 7504 },
      { passengers: 7, price: 9184 },
      { passengers: 18, price: 13552 },
      { passengers: 30, price: 23958 },
      { passengers: 49, price: 26499 },
      { passengers: 59, price: 33275 },
      { passengers: 78, price: 40656 },
    ],
  },
  {
    maxDistanceInKm: 300,
    maxTimeInHours: 12,
    pricesByPassengers: [
      { passengers: 3, price: 8400 },
      { passengers: 7, price: 11760 },
      { passengers: 18, price: 16093 },
      { passengers: 30, price: 26741 },
      { passengers: 49, price: 29645 },
      { passengers: 59, price: 36058 },
      { passengers: 78, price: 46464 },
    ],
  },
  {
    maxDistanceInKm: 400,
    maxTimeInHours: 12,
    pricesByPassengers: [
      { passengers: 3, price: 8848 },
      { passengers: 7, price: 12320 },
      { passengers: 18, price: 17545 },
      { passengers: 30, price: 28314 },
      { passengers: 49, price: 31460 },
      { passengers: 59, price: 38478 },
      { passengers: 78, price: 49005 },
    ],
  },
];

const OnewayPrices = [
  {
    maxDistanceInKm: 30,
    pricesByPassengers: [
      { passengers: 3, price: 1624 },
      { passengers: 7, price: 2576 },
      { passengers: 18, price: 4417 },
      { passengers: 30, price: 5869 },
      { passengers: 49, price: 6534 },
      { passengers: 59, price: 7502 },
      { passengers: 78, price: 10951 },
    ],
  },
  {
    maxDistanceInKm: 80,
    pricesByPassengers: [
      { passengers: 3, price: 5040 },
      { passengers: 7, price: 6272 },
      { passengers: 18, price: 9317 },
      { passengers: 30, price: 13794 },
      { passengers: 49, price: 15246 },
      { passengers: 59, price: 18392 },
      { passengers: 78, price: 24442 },
    ],
  },
  {
    maxDistanceInKm: 120,
    pricesByPassengers: [
      { passengers: 3, price: 7728 },
      { passengers: 7, price: 9184 },
      { passengers: 18, price: 12947 },
      { passengers: 30, price: 19844 },
      { passengers: 49, price: 22022 },
      { passengers: 59, price: 26862 },
      { passengers: 78, price: 34848 },
    ],
  },
  {
    maxDistanceInKm: 140,
    pricesByPassengers: [
      { passengers: 3, price: 7952 },
      { passengers: 7, price: 9968 },
      { passengers: 18, price: 13915 },
      { passengers: 30, price: 21175 },
      { passengers: 49, price: 23595 },
      { passengers: 59, price: 30129 },
      { passengers: 78, price: 39809 },
    ],
  },
  {
    maxDistanceInKm: 200,
    pricesByPassengers: [
      { passengers: 3, price: 8400 },
      { passengers: 7, price: 11648 },
      { passengers: 18, price: 17666 },
      { passengers: 30, price: 27225 },
      { passengers: 49, price: 30129 },
      { passengers: 59, price: 38599 },
      { passengers: 78, price: 49005 },
    ],
  },
];

const HourWaitingPrices = [
  { passengers: 3, price: 560 },
  { passengers: 7, price: 784 },
  { passengers: 18, price: 1089 },
  { passengers: 30, price: 1573 },
  { passengers: 49, price: 1815 },
  { passengers: 59, price: 2057 },
  { passengers: 78, price: 3388 },
];

export const Prices = {
  roundtrip: RoundtripPrices,
  oneway: OnewayPrices,
  waiting: HourWaitingPrices,
};
