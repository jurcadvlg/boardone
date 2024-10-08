'use client';

import { Form } from '@/components/form';
import useTripForm from './hooks/useTripForm';
import StepDestinations from './StepDestinations/StepDestinations';
import StepSubmit from './StepSubmit/StepSubmit';
import StepConfirmation from './StepConfirmation/StepConfirmation';

export default function TripForm() {
  const { form, onSubmit, isSubmitting, step } = useTripForm();

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="mx-auto my-4 w-full max-w-[600px] rounded-2xl bg-[#F1F2F4] px-4 py-8 text-center md:my-16 md:p-16">
        <h1 className="m-0 text-[#012512DD]">Poptávka autobusové dopravy</h1>

        {step === 1 && <StepDestinations isSubmitting={isSubmitting} />}
        {step === 2 && <StepSubmit />}
        {step === 3 && <StepConfirmation />}
      </div>
    </Form>
  );
}
