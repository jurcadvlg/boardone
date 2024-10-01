import { ToggleButton, ToggleButtonGroup } from '@/components/styled';
import { MouseEvent, useState } from 'react';

export default function TripDirection() {
  const [direction, setDirection] = useState('1');

  function handleDirectionChange(event: MouseEvent<HTMLElement>, value: string) {
    setDirection(value);
  }

  return (
    <ToggleButtonGroup value={direction} exclusive onChange={handleDirectionChange} aria-label="Direction">
      <ToggleButton value="1">Jednosměrná</ToggleButton>
      <ToggleButton value="2">Zpáteční</ToggleButton>
    </ToggleButtonGroup>
  );
}
