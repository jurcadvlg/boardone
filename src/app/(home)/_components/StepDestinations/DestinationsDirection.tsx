import { ToggleButton, ToggleButtonGroup } from '@/components/styled';
import { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { TripFormValues } from '../hooks/useTripForm';

export default function DestinationsDirection({ className }: { className?: string }) {
  const { watch, setValue } = useFormContext<TripFormValues>();
  const direction = watch().direction;

  function handleDirectionChange(_: MouseEvent<HTMLElement>, value: 'oneway' | 'roundtrip') {
    if (!value) return;
    setValue('direction', value);
  }

  return (
    <div className={className}>
      <ToggleButtonGroup value={direction} exclusive onChange={handleDirectionChange} aria-label="Direction">
        <ToggleButton value="oneway">Jednosměrná</ToggleButton>
        <ToggleButton value="roundtrip">Zpáteční</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
