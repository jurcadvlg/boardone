import TripDirection from './TripDirection';
import TripDestination from './TripDestination';
import { Button } from '@/components/styled';

export default function StepTrip({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <>
      <TripDirection className="mt-10" />
      <TripDestination className="mt-6" />

      <div className="mx-auto mt-8 max-w-[250px]">
        <Button variant="contained" fullWidth type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Počítání ceny...' : 'Spočítat cenu'}
        </Button>
      </div>
    </>
  );
}
