import { directionsAtom } from '@/app/store';
import { Button } from '@/components/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useFormContext } from 'react-hook-form';
import { useSetAtom } from 'jotai';

export default function StepConfirmation() {
  const { reset, setValue } = useFormContext();
  const setDirections = useSetAtom(directionsAtom);

  function handleReset() {
    reset();
    setValue('step', 1);
    setDirections(null);
  }
  return (
    <>
      <h2 className="mt-10">Poptávka odeslána</h2>

      <div className="mt-6">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<ArrowBackIcon />} onClick={handleReset}>
          Zpět na formulář
        </Button>
      </div>
    </>
  );
}
