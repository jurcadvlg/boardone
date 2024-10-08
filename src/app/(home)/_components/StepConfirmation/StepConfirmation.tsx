import { calculationAtom } from '@/app/store';
import { Button } from '@/components/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormContext } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function StepConfirmation() {
  const { reset } = useFormContext();
  const setCalculation = useSetAtom(calculationAtom);

  function handleReset() {
    reset();
    setCalculation(null);
  }
  return (
    <>
      <div className="mt-10 rounded-2xl bg-white px-4 py-8">
        <h2 className="text-[#012512DD]">Poptávka odeslána</h2>

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
