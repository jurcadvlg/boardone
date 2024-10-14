import { calculationAtom, SubmitType, submitTypeAtom } from '@/app/store';
import { Button } from '@/components/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormContext } from 'react-hook-form';
import { useAtomValue, useSetAtom } from 'jotai';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function StepConfirmation() {
  const { reset } = useFormContext();
  const setCalculation = useSetAtom(calculationAtom);
  const submitType = useAtomValue(submitTypeAtom);

  function handleReset() {
    reset();
    setCalculation(null);
  }
  return (
    <>
      <div className="mt-10 rounded-2xl bg-white px-4 py-8">
        {submitType === SubmitType.Submit && <h2 className="text-[#172039]">Poptávka odeslána</h2>}
        {submitType === SubmitType.Save && (
          <h2 className="text-[#172039]">Poptávku včetně cenové kalkulace jsme Vám zaslali na e-mail</h2>
        )}

        <div>
          <CheckCircleIcon sx={{ fontSize: '48px', color: '#06c760' }} />
        </div>
      </div>

      <div className="mt-6">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<ArrowBackIcon />} onClick={handleReset}>
          Zpět na formulář
        </Button>
      </div>
    </>
  );
}
