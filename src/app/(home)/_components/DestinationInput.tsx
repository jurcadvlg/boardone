import { TextField } from '@/components/styled';
import { InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import React from 'react';

type Props = {
  placeholder: string;
  type: 'start' | 'end' | 'stop';
  number?: number;
};

export default function DestinationInput({ placeholder, type, number }: Props) {
  let adornment = <></>;
  switch (type) {
    case 'start':
      adornment = (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9b59b6]">
          <LocationOnIcon sx={{ fontSize: '16px', color: 'white' }} />
        </div>
      );
      break;

    case 'end':
      adornment = (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3498db]">
          <FlagIcon sx={{ fontSize: '16px', color: 'white' }} />
        </div>
      );
      break;

    case 'stop':
      adornment = (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fdcb6e]">
          <span className="text-base font-bold text-white">{number}</span>
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      slotProps={{
        input: {
          sx: { backgroundColor: 'white' },
          startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
        },
      }}
      fullWidth
    />
  );
}
