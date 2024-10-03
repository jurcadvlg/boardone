'use client';

import { Button } from '@/components/styled';
import { IconButton } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import React, { useState } from 'react';
import { ulid } from 'ulid';
import { toast } from 'sonner';
import TripTime from './TripTime';
import { AddressAutocomplete } from '@/components/form';

type StopField = {
  id: string;
};

export default function TripDestination({ className }: { className?: string }) {
  const [fields, setFields] = useState<StopField[]>([]);

  function handleAddField() {
    if (fields.length >= 3) {
      toast.error('Lze přidat maximálně 3 zastávky');
      return;
    }
    setFields((fields) => [...fields, { id: ulid() }]);
  }

  function handleDeleteField(id: string) {
    setFields((fields) => fields.filter((field) => field.id !== id));
  }

  return (
    <div className={className}>
      <div className="w-full">
        <div className="relative mb-4 flex w-full items-center">
          <AddressAutocomplete name="origin" placeholder="Odkud..." type="origin" />
          <div className="absolute right-2">
            <IconButton aria-label="swap">
              <SwapVertIcon />
            </IconButton>
          </div>
        </div>

        <div className="mb-4">
          <TripTime />
        </div>

        {fields.map((field, i) => (
          <div key={field.id} className="relative mb-4 flex w-full items-center">
            <AddressAutocomplete name={`waypoint${i + 1}`} placeholder="Kam..." type="waypoint" number={i + 1} />
            <div className="absolute right-2">
              <IconButton aria-label="delete" onClick={() => handleDeleteField(field.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}

        <AddressAutocomplete name="destination" placeholder="Kam..." type="destination" />
      </div>

      <div className="mt-2">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<AddLocationAltIcon />} onClick={handleAddField}>
          Přidat mezizastávku
        </Button>
      </div>
    </div>
  );
}
