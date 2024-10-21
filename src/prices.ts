const RoundtripPrices = [
  {
    maxDistanceInKm: 80,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 5445 },
      { passengers: 7, price: 6292 },
      { passengers: 18, price: 8848 },
      { passengers: 30, price: 13328 },
      { passengers: 49, price: 14784 },
      { passengers: 59, price: 18144 },
      { passengers: 78, price: 24080 },
    ],
  },
  {
    maxDistanceInKm: 120,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 5566 },
      { passengers: 7, price: 6897 },
      { passengers: 18, price: 9744 },
      { passengers: 30, price: 15344 },
      { passengers: 49, price: 17024 },
      { passengers: 59, price: 19936 },
      { passengers: 78, price: 27552 },
    ],
  },
  {
    maxDistanceInKm: 140,
    maxTimeInHours: 6,
    pricesByPassengers: [
      { passengers: 3, price: 5929 },
      { passengers: 7, price: 7139 },
      { passengers: 18, price: 10640 },
      { passengers: 30, price: 16576 },
      { passengers: 49, price: 18368 },
      { passengers: 59, price: 21280 },
      { passengers: 78, price: 29456 },
    ],
  },
  {
    maxDistanceInKm: 120,
    maxTimeInHours: 9,
    pricesByPassengers: [
      { passengers: 3, price: 8107 },
      { passengers: 7, price: 9922 },
      { passengers: 18, price: 12544 },
      { passengers: 30, price: 22176 },
      { passengers: 49, price: 24528 },
      { passengers: 59, price: 30800 },
      { passengers: 78, price: 37632 },
    ],
  },
  {
    maxDistanceInKm: 300,
    maxTimeInHours: 12,
    pricesByPassengers: [
      { passengers: 3, price: 9075 },
      { passengers: 7, price: 12705 },
      { passengers: 18, price: 14896 },
      { passengers: 30, price: 24752 },
      { passengers: 49, price: 27440 },
      { passengers: 59, price: 33376 },
      { passengers: 78, price: 43008 },
    ],
  },
  {
    maxDistanceInKm: 400,
    maxTimeInHours: 12,
    pricesByPassengers: [
      { passengers: 3, price: 9559 },
      { passengers: 7, price: 13310 },
      { passengers: 18, price: 16240 },
      { passengers: 30, price: 26208 },
      { passengers: 49, price: 29120 },
      { passengers: 59, price: 35616 },
      { passengers: 78, price: 45360 },
    ],
  },
];

const OnewayPrices = [
  {
    maxDistanceInKm: 30,
    pricesByPassengers: [
      { passengers: 3, price: 1755 },
      { passengers: 7, price: 2783 },
      { passengers: 18, price: 4088 },
      { passengers: 30, price: 5432 },
      { passengers: 49, price: 6048 },
      { passengers: 59, price: 6944 },
      { passengers: 78, price: 10136 },
    ],
  },
  {
    maxDistanceInKm: 80,
    pricesByPassengers: [
      { passengers: 3, price: 5445 },
      { passengers: 7, price: 6776 },
      { passengers: 18, price: 8624 },
      { passengers: 30, price: 12768 },
      { passengers: 49, price: 14112 },
      { passengers: 59, price: 17024 },
      { passengers: 78, price: 22624 },
    ],
  },
  {
    maxDistanceInKm: 120,
    pricesByPassengers: [
      { passengers: 3, price: 8349 },
      { passengers: 7, price: 9922 },
      { passengers: 18, price: 11984 },
      { passengers: 30, price: 18368 },
      { passengers: 49, price: 20384 },
      { passengers: 59, price: 24864 },
      { passengers: 78, price: 32256 },
    ],
  },
  {
    maxDistanceInKm: 140,
    pricesByPassengers: [
      { passengers: 3, price: 8591 },
      { passengers: 7, price: 10769 },
      { passengers: 18, price: 12880 },
      { passengers: 30, price: 19600 },
      { passengers: 49, price: 21840 },
      { passengers: 59, price: 27888 },
      { passengers: 78, price: 36848 },
    ],
  },
  {
    maxDistanceInKm: 200,
    pricesByPassengers: [
      { passengers: 3, price: 9075 },
      { passengers: 7, price: 12584 },
      { passengers: 18, price: 16352 },
      { passengers: 30, price: 25200 },
      { passengers: 49, price: 27888 },
      { passengers: 59, price: 35728 },
      { passengers: 78, price: 45360 },
    ],
  },
];

const HourWaitingPrices = [
  { passengers: 3, price: 605 },
  { passengers: 7, price: 847 },
  { passengers: 18, price: 1008 },
  { passengers: 30, price: 1456 },
  { passengers: 49, price: 1680 },
  { passengers: 59, price: 1904 },
  { passengers: 78, price: 3136 },
];

export const Prices = {
  roundtrip: RoundtripPrices,
  oneway: OnewayPrices,
  waiting: HourWaitingPrices,
};
