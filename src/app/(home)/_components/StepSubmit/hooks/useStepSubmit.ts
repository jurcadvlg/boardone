import { useState } from 'react';
import { toast } from 'sonner';
import { useAtomValue } from 'jotai';
import to from '@/utils/awaitTo';
import { calculationAtom } from '@/app/store';
import { useFormContext } from 'react-hook-form';
import { TripFormValues } from '../../hooks/useTripForm';
import { Calculation } from '@/app/api/trip/calculate/route';

export type SubmitDto = {
  formData: TripFormValues;
  calculation: Calculation;
};

export default function useStepSubmit() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const calculation = useAtomValue(calculationAtom);

  const { setValue, getValues, trigger } = useFormContext<TripFormValues>();

  async function onSave() {
    setIsSaving(true);
    const data = getValues();

    const isValid = await trigger();
    if (!isValid || !calculation) {
      setIsSaving(false);
      return;
    }

    const dto: SubmitDto = {
      formData: data,
      calculation: calculation,
    };

    const [error, response] = await to(
      fetch('/api/trip/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
      })
    );

    setIsSaving(false);

    if (error || !response.ok) {
      toast.error('Nepodařilo se uložit poptávku. Zkuste to prosím znovu.');
      return;
    }

    setValue('step', 3);
  }

  async function onSend() {
    setIsSending(true);
    const data = getValues();

    const isValid = await trigger();
    if (!isValid || !calculation) {
      setIsSending(false);
      return;
    }

    const dto: SubmitDto = {
      formData: data,
      calculation: calculation,
    };

    const [error, response] = await to(
      fetch('/api/trip/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
      })
    );

    setIsSending(false);

    if (error || !response.ok) {
      toast.error('Nepodařilo se odeslat poptávku. Zkuste to prosím znovu.');
      return;
    }

    setValue('step', 3);
  }

  function stepBack() {
    setValue('step', 1);
  }

  return {
    calculation,
    isSaving,
    isSending,
    onSave,
    onSend,
    stepBack,
  };
}
