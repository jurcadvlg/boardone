import { ToggleButton, ToggleButtonGroup } from '@/components/styled';
import { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { TripFormValues } from '../hooks/useTripForm';
import { useAtom } from 'jotai';
import { fieldsAtom } from '@/app/store';
import { ulid } from 'ulid';

export default function DestinationsDirection({ className }: { className?: string }) {
  const { watch, setValue } = useFormContext<TripFormValues>();
  const direction = watch().direction;
  const [fields, setFields] = useAtom(fieldsAtom);

  function handleDirectionChange(_: MouseEvent<HTMLElement>, value: 'oneway' | 'roundtrip') {
    if (!value) return;
    setValue('direction', value);

    if (value === 'roundtrip' && fields.length < 1) {
      setFields((fields) => [...fields, { id: ulid() }]);
    }
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
