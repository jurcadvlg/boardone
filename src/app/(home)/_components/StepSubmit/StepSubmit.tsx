import { Button } from '@/components/styled';
import SubmitContactForm from './SubmitContactForm';
import SubmitRecap from './SubmitRecap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'sonner';
import useStepSubmit from './hooks/useStepSubmit';
import {
  isWeekday as getIsWeekday,
  isMorningHours as getIsMorningHours,
  isWorkingHours as getIsWorkingHours,
} from '@/utils/timeUtil';

export default function StepSubmit() {
  const { calculation, isSaving, isSubmitting, onSave, onSubmit, stepBack } = useStepSubmit();
  const isWeekday = getIsWeekday();
  const isMorningHours = getIsMorningHours();
  const isWorkingHours = getIsWorkingHours();

  const submitButtonText = calculation?.individualCalculation
    ? 'Poptat individuální kalkulaci'
    : 'Závazně poptat dopravu';

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
          <div className="mx-auto w-fit border-0 border-b-2 border-solid border-b-[#06c760] text-3xl font-bold text-[#172039]">
            {calculation.price.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <div>Cena včetně DPH</div>
            <div>Do ceny nejsou zahrnuty náklady na parkovné a vjezdy autobusu</div>
          </div>
        </div>
      )}

      {(calculation.individualCalculation || !calculation.price) && (
        <div className="mt-8 text-lg text-[#172039]">
          <div>Vaše zadání vyžaduje individuální kalkukaci.</div>
          {isWeekday ? (
            <>
              {isMorningHours && !isWorkingHours && (
                <div>
                  Prosím, vyplňte kontaktní údaje. Do 10:00 Vám zavolá náš kolega Marek a bude se Vám plně věnovat.
                </div>
              )}

              {isWorkingHours && !isMorningHours && (
                <div>
                  Prosím, vyplňte kontaktní údaje. Do 15 minut Vám zavolá náš kolega Marek a bude se Vám plně věnovat.
                </div>
              )}

              {!isWorkingHours && !isMorningHours && (
                <div>
                  Prosím, vyplňte kontaktní údaje. Následující pracovní den Vám zavolá náš kolega Marek a bude se Vám
                  plně věnovat.
                </div>
              )}
            </>
          ) : (
            <div>
              Prosím, vyplňte kontaktní údaje. Následující pracovní den Vám zavolá náš kolega Marek a bude se Vám plně
              věnovat.
            </div>
          )}
        </div>
      )}

      <div className="mt-10">
        <SubmitContactForm />
      </div>

      <div className="mt-8 flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex-1 md:text-left">
          <Button variant="outlined" type="submit" disabled={isSaving} onClick={onSave}>
            {isSaving ? 'Odesílání...' : 'Poslat kalkulaci na e-mail'}
          </Button>
        </div>
        <div className="flex-1 md:text-right">
          <Button variant="contained" type="submit" disabled={isSubmitting} onClick={onSubmit}>
            {isSubmitting ? 'Odesílání...' : submitButtonText}
          </Button>
        </div>
      </div>

      <div className="mt-6 text-left">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<ArrowBackIcon />} onClick={stepBack}>
          Zpět na výběr trasy
        </Button>
      </div>
    </>
  );
}
