'use client';

import { Button } from '@/components/styled';
import { IconButton } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import React, { useState } from 'react';
import { ulid } from 'ulid';
import DestinationInput from './DestinationInput';
import { toast } from 'sonner';

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
      {fields.length <= 0 && (
        <div className="relative flex items-center">
          <div className="flex-1 rounded-2xl bg-white">
            <div className="border-0 border-b border-solid border-gray-100">
              <DestinationInput placeholder="Odkud..." type="start" />
            </div>
            <DestinationInput placeholder="Kam..." type="end" />
          </div>
          <div className="absolute right-2">
            <IconButton aria-label="swap">
              <SwapVertIcon />
            </IconButton>
          </div>
        </div>
      )}

      {fields.length > 0 && (
        <div className="w-full">
          <div className="relative mb-2 flex items-center">
            <DestinationInput placeholder="Odkud..." type="start" />
            <div className="absolute right-2">
              <IconButton aria-label="swap">
                <SwapVertIcon />
              </IconButton>
            </div>
          </div>

          {fields.map((field, i) => (
            <div key={field.id} className="relative mb-2 flex w-full items-center">
              <DestinationInput placeholder="Mezizastávka..." type="stop" number={i + 1} />
              <div className="absolute right-2">
                <IconButton aria-label="delete" onClick={() => handleDeleteField(field.id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}

          <DestinationInput placeholder="Kam..." type="end" />
        </div>
      )}

      <div className="mt-2">
        <Button variant="text" sx={{ color: '#3498db' }} startIcon={<AddLocationAltIcon />} onClick={handleAddField}>
          Přidat mezizastávku
        </Button>
      </div>
    </div>
  );
}
