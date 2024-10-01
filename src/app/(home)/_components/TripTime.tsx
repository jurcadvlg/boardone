import { TextField } from '@/components/styled';
import React from 'react';

export default function TripTime() {
  return (
    <div className="flex gap-4">
      <TextField
        variant="outlined"
        value={'Nyní'}
        slotProps={{
          input: {
            startAdornment: <span className="mr-1 text-gray-400">Odjezd: </span>,
            sx: {
              backgroundColor: 'white',
            },
          },
        }}
      />

      <TextField
        variant="outlined"
        value={'18:30'}
        slotProps={{
          input: {
            startAdornment: <span className="mr-1 text-gray-400">Příjezd: </span>,
            sx: {
              backgroundColor: 'white',
            },
          },
        }}
      />
    </div>
  );
}
