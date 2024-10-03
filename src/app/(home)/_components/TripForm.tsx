'use client';

import { Button } from '@/components/styled';
import TripDirection from './TripDirection';
import TripDestination from './TripDestination';
import { Form } from '@/components/form';
import useTripForm from './_hooks/useTripForm';

export default function TripForm() {
  const { form, onSubmit, directions, isSubmitting } = useTripForm();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="m-4 w-full max-w-[500px] rounded-2xl bg-[#F1F2F4] px-4 py-8 text-center md:m-16 md:p-16">
        <h1 className="m-0">Poptávka autobusové dopravy</h1>

        <TripDirection className="mt-10" />
        <TripDestination className="mt-6" />

        <div className="mx-auto mt-8 max-w-[250px]">
          <Button variant="contained" fullWidth type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Počítání ceny...' : 'Spočítat cenu'}
          </Button>
        </div>

        {directions && (
          <div className="mt-8">
            <div>Vzdálenost: {directions.routes[0].legs[0].distance.text}</div>
            <div>Délka: {directions.routes[0].legs[0].duration.text}</div>
          </div>
        )}
      </div>
    </Form>
  );
}
