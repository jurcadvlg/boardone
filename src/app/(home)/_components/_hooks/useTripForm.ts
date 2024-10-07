import { Directions } from '@/types/Directions';
import to from '@/utils/awaitTo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { directionsAtom } from '@/app/store';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';

export type TripFormValues = {
  step: number;
  origin: string;
  waypoint1?: string | null;
  waypoint2?: string | null;
  waypoint3?: string | null;
  waypoint4?: string | null;
  waypoint5?: string | null;
  destination: string;
  timeStart: string;
  timeArrival: string;
  direction?: 'oneway' | 'roundtrip';
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
};

export default function useTripForm() {
  const setDirections = useSetAtom(directionsAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const validationSchema = yup.object().shape({
  //   step: yup.number().required(),
  //   origin: yup.string().required('Zadejte odkud'),
  //   waypoint1: yup.string().nullable(),
  //   waypoint2: yup.string().nullable(),
  //   waypoint3: yup.string().nullable(),
  //   waypoint4: yup.string().nullable(),
  //   waypoint5: yup.string().nullable(),
  //   destination: yup.string().required('Zadejte kam'),
  //   timeStart: yup.string().nullable(),
  //   timeArrival: yup.string().nullable(),
  //   firstName: yup
  //     .string()
  //     .nullable()
  //     .when('step', {
  //       is: 2,
  //       then: (schema) => schema.required('Zadejte jméno'),
  //       otherwise: (schema) => schema,
  //     }),
  //   lastName: yup
  //     .string()
  //     .nullable()
  //     .when('step', {
  //       is: 2,
  //       then: (schema) => schema.required('Zadejte příjmení'),
  //       otherwise: (schema) => schema.nullable(),
  //     }),
  //   phoneNumber: yup
  //     .string()
  //     .nullable()
  //     .when('step', {
  //       is: 2,
  //       then: (schema) => schema.required('Zadejte telefonní číslo'),
  //       otherwise: (schema) => schema.nullable(),
  //     }),
  //   email: yup
  //     .string()
  //     .email('Zadejte platnou emailovou adresu')
  //     .nullable()
  //     .when('step', {
  //       is: 2,
  //       then: (schema) => schema.required('Zadejte emailovou adresu'),
  //       otherwise: (schema) => schema.nullable(),
  //     }),
  //   direction: yup.mixed(),
  // });

  const initialValues: TripFormValues = {
    step: 1,
    origin: '',
    waypoint1: '',
    waypoint2: '',
    waypoint3: '',
    waypoint4: '',
    waypoint5: '',
    destination: '',
    timeStart: '',
    timeArrival: '',
    direction: 'oneway',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  };

  const form = useForm<TripFormValues>({
    defaultValues: initialValues,
    // resolver: yupResolver(validationSchema),
  });

  const step = form.watch().step;

  function onSubmit(data: TripFormValues) {
    setIsSubmitting(true);

    const origin = data.origin;
    let destination = data.destination;
    const waypoint1 = data.waypoint1;
    const waypoint2 = data.waypoint2;
    const waypoint3 = data.waypoint3;
    const waypoint4 = data.waypoint4;
    const waypoint5 = data.waypoint5;
    let waypoints = [waypoint1, waypoint2, waypoint3, waypoint4, waypoint5].filter(Boolean);

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
      toast.error('Požadavek selhal. Zkuste to prosím znovu.');
      setIsSubmitting(false);
      return;
    }

    const data: Directions = await response.json();
    setDirections(data);
    setIsSubmitting(false);
    form.setValue('step', 2);
  }

  return {
    form,
    onSubmit,
    isSubmitting,
    step,
  };
}
