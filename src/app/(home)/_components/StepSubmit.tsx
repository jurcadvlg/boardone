import { Button } from '@/components/styled';
import ContactForm from './ContactForm';
import TripRecap from './TripRecap';
import { useFormContext } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAtomValue } from 'jotai';
import { directionsAtom } from '@/app/store';
import to from '@/utils/awaitTo';

export default function StepSubmit() {
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const directions = useAtomValue(directionsAtom);

  const { setValue, getValues } = useFormContext();

  async function onSave() {
    setIsSaving(true);
    const data = getValues();
    const [, response] = await to(
      fetch('/api/trip/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, distance: directions?.routes[0].legs[0].distance.text }),
      })
    );

    setIsSaving(false);

    if (response?.ok) {
      setValue('step', 3);
    } else {
      toast.error('Nepodařilo se uložit poptávku. Zkuste to prosím znovu.');
    }
  }

  async function onSend() {
    setIsSending(true);
    const data = getValues();
    const [, response] = await to(
      fetch('/api/trip/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, distance: directions?.routes[0].legs[0].distance.text }),
      })
    );

    setIsSending(false);

    if (response?.ok) {
      setValue('step', 3);
    } else {
      toast.error('Nepodařilo se odeslat poptávku. Zkuste to prosím znovu.');
    }
  }

  function stepBack() {
    setValue('step', 1);
  }

  return (
    <>
      <div className="mt-10">
        <TripRecap />
      </div>

      <div className="mt-8 text-lg text-[#012512]">
        <div>Vaše zadání vyžaduje individuální kalkukaci.</div>
        <div>Prosím, vyplňte kontaktní údaje. Do 15 minut Vám zavolá náš kolega Marek a bude se Vám plně věnovat.</div>
      </div>

      <div className="mt-10">
        <ContactForm />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full">
          <Button variant="outlined" fullWidth type="submit" disabled={isSaving} onClick={onSave}>
            {isSaving ? 'Ukládání...' : 'Uložit na pozděj'}
          </Button>
        </div>
        <div className="w-full">
          <Button variant="contained" fullWidth type="submit" disabled={isSending} onClick={onSend}>
            {isSending ? 'Odesílání...' : 'Odeslat zprávu'}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<ArrowBackIcon />} onClick={stepBack}>
          Vrátit zpět
        </Button>
      </div>
    </>
  );
}
