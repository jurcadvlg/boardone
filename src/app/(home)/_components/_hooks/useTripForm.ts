import { Directions } from '@/types/Directions';
import to from '@/utils/awaitToJs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export type TripFormValues = {
  origin: string;
  waypoint1: string;
  waypoint2: string;
  waypoint3: string;
  destination: string;
  timeStart: string;
  timeArrival: string;
  direction: 'oneway' | 'roundtrip';
};

export default function useTripForm() {
  const [directions, setDirections] = useState<Directions>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: TripFormValues = {
    origin: '',
    waypoint1: '',
    waypoint2: '',
    waypoint3: '',
    destination: '',
    timeStart: '',
    timeArrival: '',
    direction: 'oneway',
  };

  const form = useForm({
    defaultValues: initialValues,
  });

  function onSubmit(data: TripFormValues) {
    setIsSubmitting(true);

    const origin = data.origin;
    let destination = data.destination;
    const waypoint1 = data.waypoint1;
    const waypoint2 = data.waypoint2;
    const waypoint3 = data.waypoint3;
    let waypoints = [waypoint1, waypoint2, waypoint3].filter(Boolean);

    if (data.direction === 'roundtrip') {
      destination = data.origin;
      waypoints = [...waypoints, data.destination];
    }

    calculateTrip(origin, destination, waypoints as string[]);
  }

  async function calculateTrip(origin: string, destination: string, waypoints?: string[]) {
    const waypointsString = waypoints?.map((wp) => `via:${wp}`).join('|');
    const url = `/api/trip/calculate?origin=${origin}&destination=${destination}&waypoints=${waypointsString}`;

    const [error, response] = await to(fetch(url));

    if (error || !response.ok) {
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    const data: Directions = await response.json();
    setDirections(data);
    setIsSubmitting(false);
  }

  return {
    form,
    onSubmit,
    directions,
    isSubmitting,
  };
}
