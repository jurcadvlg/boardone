import DestinationsDirection from './DestinationsDirection';
import Destinations from './Destinations';
import { Button } from '@/components/styled';
import Passengers from './Passengers';

export default function StepDestinations({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <>
      <div className="rounded-2xl bg-white">
        <DestinationsDirection className="mt-10" />
        <Passengers />
      </div>

      <h2 className="mb-1 mt-8 text-[#172039]">Výběr trasy</h2>
      <Destinations />

      <div className="mx-auto mt-6 max-w-[250px]">
        <Button variant="contained" fullWidth type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Počítání ceny...' : 'Spočítat cenu'}
        </Button>
      </div>
    </>
  );
}
