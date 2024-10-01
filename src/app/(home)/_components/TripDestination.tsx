import { Button, TextField } from '@/components/styled';
import { IconButton, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import React from 'react';

export default function TripDestination({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative flex items-center">
        <div className="flex-1 rounded-2xl bg-white">
          <div className="border-0 border-b border-solid border-gray-100">
            <TextField
              variant="outlined"
              placeholder="Odkud..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9b59b6]">
                        <LocationOnIcon sx={{ fontSize: '16px', color: 'white' }} />
                      </div>
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
            />
          </div>

          <div>
            <TextField
              variant="outlined"
              placeholder="Kam..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3498db]">
                        <FlagIcon sx={{ fontSize: '16px', color: 'white' }} />
                      </div>
                    </InputAdornment>
                  ),
                },
              }}
              fullWidth
            />
          </div>
        </div>

        <div className="absolute right-2">
          <IconButton aria-label="swap">
            <SwapVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="mt-2">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<AddLocationAltIcon />}>
          Přidat mezizastávku
        </Button>
      </div>
    </div>
  );
}
