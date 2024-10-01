'use client';

import { Button } from '@/components/styled';
import TripDirection from './TripDirection';
import TripTime from './TripTime';
import TripDestination from './TripDestination';

export default function TripForm() {
  return (
    <div className="m-4 w-full max-w-[500px] rounded-2xl bg-[#F1F2F4] px-4 py-8 text-center md:m-16 md:p-16">
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
