import { TextField } from '@/components/styled';
import React from 'react';

// TODO: Change TextFields to TimePicker
export default function TripTime({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4">
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
          fullWidth
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
          fullWidth
        />
      </div>
    </div>
  );
}
