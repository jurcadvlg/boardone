'use client';

import { Button } from '@/components/styled';
import TripDirection from './TripDirection';
import TripTime from './TripTime';
import TripDestination from './TripDestination';

export default function TripForm() {
  return (
    <div className="m-16 w-full max-w-[500px] rounded-2xl bg-[#F1F2F4] p-16 text-center">
      <h1 className="m-0">Poptávka autobusové dopravy</h1>

      <TripDirection className="mt-10" />
      <TripTime className="mt-6" />
      <TripDestination className="mt-6" />

      <div className="mx-auto mt-8 max-w-[250px]">
        <Button variant="contained" fullWidth>
          Spočítat cenu
        </Button>
      </div>
    </div>
  );
}
