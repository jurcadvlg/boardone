'use client';

import { Button } from '@/components/styled';
import { IconButton } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';
// import SwapVertIcon from '@mui/icons-material/SwapVert';
import TripTime from './TripTime';
import { AddressAutocomplete } from '@/components/form';
import useTripDestination from './_hooks/useTripDestination';

export type StopField = {
  id: string;
};

export default function TripDestination({ className }: { className?: string }) {
  const { fields, direction, handleAddField, handleDeleteField } = useTripDestination();

  return (
    <div className={className}>
      <div className="w-full">
        <div className="relative mb-4 flex w-full items-center">
          <AddressAutocomplete name="origin" placeholder="Odkud..." type="origin" />
          {/* <div className="absolute right-2">
            <IconButton aria-label="swap" onClick={swapOriginAndDestination}>
              <SwapVertIcon />
            </IconButton>
          </div> */}
        </div>

        {/* <div className="mb-4">
          <TripTime />
        </div> */}

        {fields.map((field, i) => (
          <div key={field.id} className="relative mb-4 flex w-full items-center">
            <AddressAutocomplete name={`waypoint${i + 1}`} placeholder="Kam..." type="waypoint" number={i + 1} />
            {i === fields.length - 1 && (
              <div className="absolute right-2">
                <IconButton aria-label="delete" onClick={() => handleDeleteField(field.id, i)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        ))}

        <AddressAutocomplete
          name="destination"
          placeholder="Kam..."
          type="destination"
          disabled={direction === 'roundtrip'}
        />
      </div>

      {fields.length < 5 && (
        <div className="mt-2">
          <Button variant="text" sx={{ color: '#3498db' }} startIcon={<AddLocationAltIcon />} onClick={handleAddField}>
            Přidat zastávku
          </Button>
        </div>
      )}
    </div>
  );
}
