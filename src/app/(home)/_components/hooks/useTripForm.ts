import to from '@/utils/awaitTo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { calculationAtom } from '@/app/store';
import { Calculation } from '@/app/api/trip/calculate/route';

export type TripDestination = {
  address?: string | null;
  departureTime?: Date | null;
};

export type TripFormValues = {
  step: number;
  direction?: 'oneway' | 'roundtrip';
  passengers: number | null;
  note?: string | null;

  origin: {
    address: string;
    departureTime: Date | null;
  };
  waypoint1: TripDestination;
  waypoint2: TripDestination;
  waypoint3: TripDestination;
  waypoint4: TripDestination;
  waypoint5: TripDestination;
  destination: {
    address: string;
    departureTime?: Date | null;
  };

  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
};

export default function useTripForm() {
  const setCalculation = useSetAtom(calculationAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = yup.object().shape({
    step: yup.number().required(),
    direction: yup.string().oneOf(['oneway', 'roundtrip']).required('Povinné pole'),
    passengers: yup.number().typeError('Povinné pole').min(1, 'Min. 1').required('Povinné pole'),
    note: yup.string().nullable(),

    origin: yup.object().shape({
      address: yup.string().required('Povinné pole'),
      departureTime: yup.date().typeError('Nesprávný formát').required('Povinné pole'),
    }),
    waypoint1: yup.object().shape({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      address: yup.string().test('is-not-undefined', 'Povinné pole', (value, context: any) => {
        const direction = context.options.from[context.from.length - 1].value.direction;
        if (direction && direction === 'roundtrip') {
          return Boolean(value);
        }
        return true;
      }),
      departureTime: yup
        .date()
        .typeError('Nesprávný formát')
        .nullable()
        .test(
          'is-after-last-departure',
          'Musí být později než čas odjezdu z předchozí zastávky',
          function (value, context) {
            const departureTime = context.from?.[context.from.length - 1].value.origin.departureTime;
            if (departureTime && value) {
              return value > departureTime;
            }
            return true;
          }
        ),
    }),
    waypoint2: yup.object().shape({
      address: yup.string().nullable(),
      departureTime: yup
        .date()
        .typeError('Nesprávný formát')
        .nullable()
        .test(
          'is-after-last-departure',
          'Musí být později než čas odjezdu z předchozí zastávky',
          function (value, context) {
            const departureTime = context.from?.[context.from.length - 1].value.waypoint1.departureTime;
            if (departureTime && value) {
              return value > departureTime;
            }
            return true;
          }
        ),
    }),
    waypoint3: yup.object().shape({
      address: yup.string().nullable(),
      departureTime: yup
        .date()
        .typeError('Nesprávný formát')
        .nullable()
        .test(
          'is-after-last-departure',
          'Musí být později než čas odjezdu z předchozí zastávky',
          function (value, context) {
            const departureTime = context.from?.[context.from.length - 1].value.waypoint2.departureTime;
            if (departureTime && value) {
              return value > departureTime;
            }
            return true;
          }
        ),
    }),
    waypoint4: yup.object().shape({
      address: yup.string().nullable(),
      departureTime: yup
        .date()
        .typeError('Nesprávný formát')
        .nullable()
        .test(
          'is-after-last-departure',
          'Musí být později než čas odjezdu z předchozí zastávky',
          function (value, context) {
            const departureTime = context.from?.[context.from.length - 1].value.waypoint3.departureTime;
            if (departureTime && value) {
              return value > departureTime;
            }
            return true;
          }
        ),
    }),
    waypoint5: yup.object().shape({
      address: yup.string().nullable(),
      departureTime: yup
        .date()
        .typeError('Nesprávný formát')
        .nullable()
        .test(
          'is-after-last-departure',
          'Musí být později než čas odjezdu z předchozí zastávky',
          function (value, context) {
            const departureTime = context.from?.[context.from.length - 1].value.waypoint4.departureTime;
            if (departureTime && value) {
              return value > departureTime;
            }
            return true;
          }
        ),
    }),
    destination: yup.object().shape({
      address: yup.string().required('Povinné pole'),
    }),

    firstName: yup
      .string()
      .nullable()
      .when('step', {
        is: 2,
        then: (schema) => schema.required('Povinné pole'),
        otherwise: (schema) => schema,
      }),
    lastName: yup
      .string()
      .nullable()
      .when('step', {
        is: 2,
        then: (schema) => schema.required('Povinné pole'),
        otherwise: (schema) => schema.nullable(),
      }),
    phoneNumber: yup
      .string()
      .nullable()
      .when('step', {
        is: 2,
        then: (schema) => schema.required('Povinné pole'),
        otherwise: (schema) => schema.nullable(),
      }),
    email: yup
      .string()
      .email('Neplatná e-mailová adresa')
      .nullable()
      .when('step', {
        is: 2,
        then: (schema) => schema.required('Povinné pole'),
        otherwise: (schema) => schema.nullable(),
      }),
  });

  const initialValues: TripFormValues = {
    step: 1,
    direction: 'oneway',
    passengers: null,
    note: null,

    origin: {
      address: '',
      departureTime: null,
    },
    waypoint1: {
      address: '',
      departureTime: null,
    },
    waypoint2: {
      address: '',
      departureTime: null,
    },
    waypoint3: {
      address: '',
      departureTime: null,
    },
    waypoint4: {
      address: '',
      departureTime: null,
    },
    waypoint5: {
      address: '',
      departureTime: null,
    },
    destination: {
      address: '',
    },

    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  };

  const form = useForm<TripFormValues>({
    resolver: yupResolver<TripFormValues>(validationSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const step = form.watch().step;

  async function onSubmit(data: TripFormValues) {
    setIsSubmitting(true);

    const [error, response] = await to(
      fetch('/api/trip/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    );
    setIsSubmitting(false);

    if (error || !response.ok) {
      toast.error('Požadavek selhal. Zkuste to prosím znovu.');
      return;
    }

    const calculation: Calculation = await response.json();
    setCalculation(calculation);
    form.setValue('step', 2);
    pushToDataLayer(data, calculation);
  }

  return {
    form,
    onSubmit,
    isSubmitting,
    step,
  };
}

function pushToDataLayer(data: TripFormValues, calculation: Calculation) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'trip_calculated',
    formName: 'step_1',
    formData: data,
    calculation: calculation,
  });
}
