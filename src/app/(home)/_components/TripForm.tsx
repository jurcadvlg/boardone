'use client';

import { Form } from '@/components/form';
import useTripForm from './_hooks/useTripForm';
import StepTrip from './StepTrip';
import StepSubmit from './StepSubmit';

export default function TripForm() {
  const { form, onSubmit, isSubmitting, step } = useTripForm();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="mx-auto my-4 w-full max-w-[600px] rounded-2xl bg-[#F1F2F4] px-4 py-8 text-center md:my-16 md:p-16">
        <h1 className="m-0 text-[#012512]">Poptávka autobusové dopravy</h1>

        {step === 1 && <StepTrip isSubmitting={isSubmitting} />}
        {step === 2 && <StepSubmit />}
      </div>
    </Form>
  );
}
