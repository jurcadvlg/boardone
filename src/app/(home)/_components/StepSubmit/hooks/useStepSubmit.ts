import { useState } from 'react';
import { toast } from 'sonner';
import { useAtomValue } from 'jotai';
import to from '@/utils/awaitTo';
import { calculationAtom } from '@/app/store';
import { useFormContext } from 'react-hook-form';

export default function useStepSubmit() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const calculation = useAtomValue(calculationAtom);

  const { setValue, getValues, trigger } = useFormContext();

  async function onSave() {
    setIsSaving(true);
    const data = getValues();

    const isValid = await trigger();
    if (!isValid) {
      setIsSaving(false);
      return;
    }

    const [error, response] = await to(
      fetch('/api/trip/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: data, calculation: calculation }),
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
    if (!isValid) {
      setIsSending(false);
      return;
    }

    const [error, response] = await to(
      fetch('/api/trip/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: data, calculation: calculation }),
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
