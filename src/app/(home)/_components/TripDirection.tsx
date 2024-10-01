import { ToggleButton, ToggleButtonGroup } from '@/components/styled';
import { MouseEvent, useState } from 'react';

export default function TripDirection({ className }: { className?: string }) {
  const [direction, setDirection] = useState('1');

  function handleDirectionChange(_: MouseEvent<HTMLElement>, value: string) {
    setDirection(value);
  }

  return (
    <div className={className}>
      <ToggleButtonGroup value={direction} exclusive onChange={handleDirectionChange} aria-label="Direction">
        <ToggleButton value="1">Jednosměrná</ToggleButton>
        <ToggleButton value="2">Zpáteční</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
