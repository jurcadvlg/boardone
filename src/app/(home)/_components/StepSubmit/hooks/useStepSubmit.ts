import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAtomValue, useSetAtom } from 'jotai';
import to from '@/utils/awaitTo';
import { calculationAtom, SubmitType, submitTypeAtom } from '@/app/store';
import { useFormContext } from 'react-hook-form';
import { TripFormValues } from '../../hooks/useTripForm';
import { Calculation } from '@/app/api/trip/calculate/route';

export type SubmitDto = {
  formData: TripFormValues;
  calculation: Calculation;
};

export default function useStepSubmit() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calculation = useAtomValue(calculationAtom);
  const setSubmitType = useSetAtom(submitTypeAtom);

  useEffect(() => {
    const pushToDataLayer = () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'step_2',
      });
    };

    pushToDataLayer();
  }, []);

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

    pushToDataLayer(dto, 'sendToEmail');
    setSubmitType(SubmitType.Save);
    setValue('step', 3);
  }

  async function onSubmit() {
    setIsSubmitting(true);
    const data = getValues();

    const isValid = await trigger();
    if (!isValid || !calculation) {
      setIsSubmitting(false);
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

    setIsSubmitting(false);

    if (error || !response.ok) {
      toast.error('Nepodařilo se odeslat poptávku. Zkuste to prosím znovu.');
      return;
    }

    pushToDataLayer(dto, 'submit');
    setSubmitType(SubmitType.Submit);
    setValue('step', 3);
  }

  function stepBack() {
    setValue('step', 1);
  }

  return {
    calculation,
    isSaving,
    isSubmitting,
    onSave,
    onSubmit,
    stepBack,
  };
}

function pushToDataLayer(data: SubmitDto, submitType: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'trip_submitted',
    formType: submitType,
    formName: 'step_2',
    formEmail: data.formData.email,
    formPhone: data.formData.phoneNumber,
    formData: data.formData,
    calculation: data.calculation,
  });
}
