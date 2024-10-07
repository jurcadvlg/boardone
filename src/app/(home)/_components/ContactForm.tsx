import { TextField } from '@/components/styled';
import { useFormContext } from 'react-hook-form';

export default function ContactForm() {
  const { register } = useFormContext();
  return (
    <>
      <h2 className="text-[#012512]">Kontaktní formulář</h2>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Jméno" fullWidth {...register('firstName')} />
          <TextField label="Příjmení" fullWidth {...register('lastName')} />
        </div>
        <TextField label="Telefon" fullWidth {...register('phoneNumber')} />
        <TextField label="E-mail" fullWidth {...register('email')} />
      </div>
    </>
  );
}
