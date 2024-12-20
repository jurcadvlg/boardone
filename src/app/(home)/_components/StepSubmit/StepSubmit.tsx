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
    : 'Pošlete mi přesnou cenu';

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
          <div className="mt-3 text-sm text-gray-500">
            <div>
              {Math.round(calculation.price * 1.12).toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}{' '}
              včetně DPH.
            </div>
            <div className="mt-2">Cena je indikativní, může být mírně upravena v upřesňující nabídce.</div>
            <div>
              {calculation.isForeignCountry
                ? 'Do ceny nejsou zahrnuty náklady na parkovné, vjezdy autobusu a zahraniční poplatky.'
                : 'Do ceny nejsou zahrnuty náklady na parkovné a vjezdy autobusu.'}
            </div>
          </div>
        </div>
      )}

      {(calculation.individualCalculation || !calculation.price) && (
        <div className="mt-8 text-lg text-[#172039]">
          <div>Vaše zadání vyžaduje individuální kalkulaci.</div>
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

      <div className="mt-8 grid grid-cols-1 gap-2 text-center">
        <div>
          <Button variant="contained" type="submit" disabled={isSubmitting} onClick={onSubmit}>
            {isSubmitting ? 'Odesílání...' : submitButtonText}
          </Button>
        </div>
        {!calculation.individualCalculation && (
          <div className="mt-2">
            {calculation.price && (
              <div className="mt-2 text-sm text-gray-700">
                Pokud ještě nejste rozhodnuti, pošlete si kopii této kalkulace na email.
              </div>
            )}
            <div>
              <Button variant="text" type="submit" disabled={isSaving} onClick={onSave}>
                {isSaving ? 'Odesílání...' : 'Odeslat na e-mail'}
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-left">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<ArrowBackIcon />} onClick={stepBack}>
          Zpět na výběr trasy
        </Button>
      </div>
    </>
  );
}
