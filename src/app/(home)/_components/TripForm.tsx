'use client';

import { Button } from '@/components/styled';
import TripDirection from './TripDirection';
import TripTime from './TripTime';
import TripDestination from './TripDestination';

export default function TripForm() {
  return (
    <div className="m-16 w-full max-w-[500px] rounded-2xl bg-[#F1F2F4] p-16 text-center">
      {/* Title */}
      <h1 className="m-0">Poptávka autobousové dopravy</h1>

      {/* Direction */}
      <div className="mt-10">
        <TripDirection />
      </div>

      {/* Time */}
      <div className="mt-8">
        <TripTime />
      </div>

      {/* Destination */}
      <div className="mt-8">
        <TripDestination />
      </div>

      {/* Calculate */}
      <div className="mt-8">
        <Button variant="contained" sx={{ width: '250px' }}>
          Spočítat cenu
        </Button>
      </div>
    </div>
  );
}
