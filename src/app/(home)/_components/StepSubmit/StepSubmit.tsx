import { Button } from '@/components/styled';
import SubmitContactForm from './SubmitContactForm';
import SubmitRecap from './SubmitRecap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'sonner';
import useStepSubmit from './hooks/useStepSubmit';

export default function StepSubmit() {
  const { calculation, isSaving, isSending, onSave, onSend, stepBack } = useStepSubmit();

  const submitButtonText = calculation?.individualCalculation
    ? 'Poptat individuální kalkulaci'
    : 'Závazně objednat dopravu';

  if (!calculation) {
    toast.error('Nepodařilo se načíst kalkulaci. Zkuste to prosím znovu.');

    return (
      <>
        <div className="mt-6">
          <Button variant="text" sx={{ color: '#3498db' }} startIcon={<ArrowBackIcon />} onClick={stepBack}>
            Vrátit zpět
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mt-10">
        <SubmitRecap />
      </div>

      {calculation.price && !calculation.individualCalculation && (
        <div className="my-12">
          <div className="mx-auto w-fit border-0 border-b-2 border-solid border-b-[#06c760] text-3xl font-bold text-[#012512DD]">
            {calculation.price.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <div>Cena včetně DPH</div>
            <div>Do ceny nejsou zahrnuty náklady na parkovné a vjezdy autobusu</div>
          </div>
        </div>
      )}

      {(calculation.individualCalculation || !calculation.price) && (
        <div className="mt-8 text-lg text-[#012512DD]">
          <div>Vaše zadání vyžaduje individuální kalkukaci.</div>
          <div>
            Prosím, vyplňte kontaktní údaje. Do 15 minut Vám zavolá náš kolega Marek a bude se Vám plně věnovat.
          </div>
        </div>
      )}

      <div className="mt-10">
        <SubmitContactForm />
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex-1 md:text-left">
          <Button variant="outlined" type="submit" disabled={isSaving} onClick={onSave}>
            {isSaving ? 'Ukládání...' : 'Uložit na pozděj'}
          </Button>
        </div>
        <div className="flex-1 md:text-right">
          <Button variant="contained" type="submit" disabled={isSending} onClick={onSend}>
            {isSending ? 'Odesílání...' : submitButtonText}
          </Button>
        </div>
      </div>

      <div className="mt-6 text-left">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<ArrowBackIcon />} onClick={stepBack}>
          Vrátit se zpět
        </Button>
      </div>
    </>
  );
}
