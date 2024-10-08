'use client';

import { Button } from '@/components/styled';
import { IconButton } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';
// import SwapVertIcon from '@mui/icons-material/SwapVert';
import { AddressAutocomplete } from '@/components/form';
import useDestinations from './hooks/useDestinations';
import DestinationTime from './DestinationTime';

export type StopField = {
  id: string;
};

export default function Destinations({ className }: { className?: string }) {
  const { fields, direction, handleAddField, handleDeleteField } = useDestinations();

  return (
    <div className={className}>
      <div className="w-full">
        <div className="mt-4 rounded-2xl bg-white">
          <div className="border-0 border-b border-solid border-gray-100">
            <AddressAutocomplete name="origin.address" placeholder="Odkud..." type="origin" />
          </div>
          <DestinationTime name="origin.departureTime" />
        </div>

        {/* Waypoints */}
        {fields.map((field, i) => (
          <WaypointDestination
            key={field.id}
            i={i}
            count={fields.length}
            id={field.id}
            handleDeleteField={handleDeleteField}
          />
        ))}

        <div className="mt-2">
          <AddressAutocomplete
            name="destination.address"
            placeholder="Kam..."
            type="destination"
            disabled={direction === 'roundtrip'}
          />
        </div>

        <div className="mt-1">
          {fields.length < 5 && (
            <Button
              variant="text"
              sx={{ color: '#3498db' }}
              startIcon={<AddLocationAltIcon />}
              onClick={handleAddField}
            >
              Přidat zastávku
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function WaypointDestination({
  i,
  count,
  id,
  handleDeleteField,
}: {
  i: number;
  count: number;
  id: string;
  handleDeleteField: (id: string, i: number) => void;
}) {
  return (
    <div className="mt-2 rounded-2xl bg-white">
      <div className="relative flex w-full items-center border-0 border-b border-solid border-gray-100">
        <AddressAutocomplete name={`waypoint${i + 1}.address`} placeholder="Kam..." type="waypoint" number={i + 1} />
        {i === count - 1 && (
          <div className="absolute right-0.5">
            <IconButton aria-label="delete" onClick={() => handleDeleteField(id, i)}>
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </div>

      <DestinationTime name={`waypoint${i + 1}.departureTime`} />
    </div>
  );
}
