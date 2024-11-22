import { TripDestination, TripFormValues } from '@/app/(home)/_components/hooks/useTripForm';
import { Config } from '@/config';
import { Directions } from '@/types/Directions';
import to from '@/utils/awaitTo';
import { getCalculationEmailContent } from '@/utils/emails/getCalculationEmailContent';
import { getTripPrice } from '@/utils/getTripPrice';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const GOOGLE_MAPS_URL = Config.googleMapsUrl;
const FREE_WAITING_TIME = Config.calculation.freeWaitingTimeInMinutes / 60;

export type Calculation = {
  routes: Route[];
  price: number | null;
  duration: number;
  distance: number;
  individualCalculation: boolean;
  passengers: number;
  isForeignCountry: boolean;
};

type Route = {
  from: {
    address: string;
    departureDate?: Date | null;
  };
  to: {
    address: string;
    arrivalDate?: Date | null;
    departureDate?: Date | null;
  };
  duration: number;
  distance: number;
};

export async function POST(req: NextRequest) {
  const body: TripFormValues = await req.json();
  if (!body) return NextResponse.json({ error: 'Missing body' }, { status: 400 });

  let individualCalculation = false;

  const [routes, isArrivalTimeConflicted, isForeignCountry, isDepartureFromPrague] = await getRoutes(body);

  if (isArrivalTimeConflicted) {
    individualCalculation = true;
  }

  if (!routes || !routes.length) {
    return NextResponse.json({ error: 'Error fetching directions' }, { status: 500 });
  }

  const totalDuration = routes.reduce((sum, route) => sum + route.duration, 0);
  const totalDistance = routes.reduce((sum, route) => sum + route.distance, 0);

  const totalDurationInHours = totalDuration / 3600;
  const totalDistanceInKm = totalDistance / 1000;
  const [waitingTimeInHours, paidWaitingTimeInHours, isLongerThanTwelveHours] = getWaitingTime(routes);

  if (isLongerThanTwelveHours) {
    individualCalculation = true;
  }

  const tripStartDate = routes[0].from.departureDate;
  const tripEndDate = routes[routes.length - 1].to.arrivalDate;

  const price = getTripPrice(
    totalDistanceInKm,
    totalDurationInHours,
    waitingTimeInHours,
    paidWaitingTimeInHours,
    body.passengers ?? 0,
    body.direction ?? '',
    isDepartureFromPrague,
    tripStartDate,
    tripEndDate
  );

  if (!price) {
    individualCalculation = true;
  }

  const calculation: Calculation = {
    routes: routes,
    duration: totalDurationInHours + waitingTimeInHours,
    distance: totalDistanceInKm,
    price: price,
    individualCalculation: individualCalculation,
    passengers: body.passengers || 0,
    isForeignCountry: isForeignCountry,
  };

  const { text, html } = getCalculationEmailContent({ formData: body, calculation });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailForInfo = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_INFO_TO,
    subject: 'BoardOne: Byla vytvořena kalkulace',
    text: text,
    html: html,
  };

  await to(transporter.sendMail(mailForInfo));

  return NextResponse.json(calculation);
}

function getWaitingTime(routes: Route[]): [number, number, boolean] {
  let totalWaitingTime = 0;
  let paidWaitingTime = 0;
  let isLongerThanTwelveHours = false;

  routes.forEach((route) => {
    const arrivalDate = route.to.arrivalDate;
    const departureDate = route.to.departureDate;

    if (arrivalDate && departureDate) {
      const waitingTime = (departureDate.getTime() - arrivalDate.getTime()) / 1000 / 3600;

      if (waitingTime >= 12) {
        isLongerThanTwelveHours = true;
      }

      totalWaitingTime += waitingTime > 0 ? waitingTime : 0;
      paidWaitingTime += waitingTime > FREE_WAITING_TIME ? Math.ceil(waitingTime) : 0;
    }
  });

  return [totalWaitingTime, paidWaitingTime, isLongerThanTwelveHours];
}

async function getRoutes(body: TripFormValues): Promise<[Route[] | null, boolean, boolean, boolean]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

  const destinations = [
    body.origin,
    body.waypoint1,
    body.waypoint2,
    body.waypoint3,
    body.waypoint4,
    body.waypoint5,
    body.destination,
  ].filter((v) => Boolean(v?.address));

  const routes: Route[] = [];

  let i = 0;
  let lastDepartureDate = body.origin.departureTime ?? new Date();
  let isArrivalTimeConflicted = false; // If arrival time is later than departure time of the next destination, return individual calculation
  let isForeignCountry = false;

  let isDepartureFromPrague = false;

  const distanceFromPrague = await getDistanceFromPrague(body.origin.address);

  if (distanceFromPrague < 10) {
    isDepartureFromPrague = true;
  }

  for (const origin of destinations as TripDestination[]) {
    i += 1;
    const destination = destinations[i];
    if (!destination) break;

    const url = `${GOOGLE_MAPS_URL}?origin=${origin?.address}&destination=${destination.address}&key=${apiKey}`;
    const [error, response] = await to(fetch(url));

    if (error || !response) {
      return [null, false, false, false];
    }

    const data: Directions = await response.json();

    const duration = data.routes[0].legs[0].duration.value;
    const distance = data.routes[0].legs[0].distance.value;

    if (
      !data.routes[0].legs[0].start_address.includes('Czechia') ||
      !data.routes[0].legs[0].end_address.includes('Czechia')
    ) {
      isForeignCountry = true;
    }

    const arrivalDate = origin.departureTime
      ? addDurationToDate(new Date(origin.departureTime), duration)
      : addDurationToDate(new Date(lastDepartureDate), duration);

    const departureDate = destination.departureTime
      ? new Date(destination.departureTime)
      : origin.departureTime
        ? addDurationToDate(new Date(origin.departureTime), duration)
        : addDurationToDate(new Date(lastDepartureDate), duration);

    if (arrivalDate > departureDate) {
      isArrivalTimeConflicted = true;
    }

    routes.push({
      from: {
        address: origin.address || '',
        departureDate: origin.departureTime ? new Date(origin.departureTime) : null,
      },
      to: {
        address: destination.address || '',
        arrivalDate: arrivalDate,
        departureDate: departureDate,
      },
      duration: duration,
      distance: distance,
    });

    lastDepartureDate = departureDate;
  }

  return [routes, isArrivalTimeConflicted, isForeignCountry, isDepartureFromPrague];
}

function addDurationToDate(date: Date, time: number) {
  const newDate = new Date(date.getTime());
  newDate.setTime(newDate.getTime() + time * 1000);
  return newDate;
}

async function getDistanceFromPrague(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;
  const pragueAddress = 'Prague, Czechia';

  const url = `${GOOGLE_MAPS_URL}?origin=${pragueAddress}&destination=${address}&key=${apiKey}`;
  const [error, response] = await to(fetch(url));

  if (error || !response) {
    return 0;
  }

  const data: Directions = await response.json();

  const distance = data.routes[0].legs[0].distance.value;
  return distance ?? 0;
}
