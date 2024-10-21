import { TextField } from '@/components/form/fields';
import { useFormContext } from 'react-hook-form';

export default function SubmitContactForm() {
  const { register } = useFormContext();
  return (
    <>
      <h2 className="text-[#172039]">Kontaktní formulář</h2>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Jméno" fullWidth {...register('firstName')} />
          <TextField label="Příjmení" fullWidth {...register('lastName')} />
        </div>
        <TextField label="Telefon" fullWidth {...register('phoneNumber')} />
        <TextField label="E-mail" fullWidth {...register('email')} />
        <TextField
          label="Poznámka"
          multiline
          rows={2}
          placeholder="Poznámka (nepovinné)"
          fullWidth
          {...register('note')}
        />
      </div>
    </>
  );
}
