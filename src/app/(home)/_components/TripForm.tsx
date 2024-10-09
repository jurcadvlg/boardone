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
      <div className="mx-auto w-full max-w-[700px]">
        <div className="mx-4 my-4 rounded-2xl bg-[#F1F2F4] py-8 text-center md:mx-0 md:my-16 md:py-16">
          <div className="mx-8 md:mx-16">
            <h1 className="m-0 text-[#012512DD]">Poptávka autobusové dopravy</h1>

            {step === 1 && <StepDestinations isSubmitting={isSubmitting} />}
            {step === 2 && <StepSubmit />}
            {step === 3 && <StepConfirmation />}
          </div>
        </div>
      </div>
    </Form>
  );
}
