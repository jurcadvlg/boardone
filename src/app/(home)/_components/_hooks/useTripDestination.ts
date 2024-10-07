import { useFormContext } from 'react-hook-form';
import { useAtom } from 'jotai';
import { fieldsAtom } from '@/app/store';
import { useEffect } from 'react';
import { ulid } from 'ulid';
import { toast } from 'sonner';

export default function useTripDestination() {
  const { setValue, getValues, watch } = useFormContext();
  const { direction, origin } = watch();
  const [fields, setFields] = useAtom(fieldsAtom);

  function handleAddField() {
    if (fields.length >= 5) {
      toast.error('Lze přidat maximálně 5 zastávek');
      return;
    }
    setFields((fields) => [...fields, { id: ulid() }]);
  }

  function handleDeleteField(id: string, i: number) {
    setFields((fields) => fields.filter((field) => field.id !== id));
    setValue(`waypoint${i + 1}`, null);
  }

  function swapOriginAndDestination() {
    const { origin, destination, waypoint1, waypoint2, waypoint3, waypoint4, waypoint5 } = getValues();

    setValue('origin', destination);
    setValue('destination', origin);

    const waypoints = [waypoint1, waypoint2, waypoint3, waypoint4, waypoint5];
    const filteredWaypoints = waypoints.filter(Boolean);
    filteredWaypoints.reverse();

    if (filteredWaypoints.length <= 1) return;

    for (let i = 0; i < 5; i++) {
      setValue('waypoint' + (i + 1), filteredWaypoints[i] || '');
    }
  }

  useEffect(() => {
    if (direction === 'roundtrip') {
      setValue('destination', origin);
    }
  }, [direction, origin, setValue]);

  return {
    fields,
    direction,
    handleAddField,
    handleDeleteField,
    swapOriginAndDestination,
  };
}
