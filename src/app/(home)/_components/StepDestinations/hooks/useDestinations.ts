import { useFormContext } from 'react-hook-form';
import { useAtom } from 'jotai';
import { fieldsAtom } from '@/app/store';
import { useEffect } from 'react';
import { ulid } from 'ulid';
import { toast } from 'sonner';

export default function useDestinations() {
  const { setValue, getValues, watch } = useFormContext();
  const { direction } = watch();
  const originAddress = watch('origin.address');
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
    setValue(
      `waypoint${i + 1}`,
      {
        address: '',
        departureTime: null,
      },
      { shouldDirty: true, shouldValidate: true }
    );
  }

  function swapOriginAndDestination() {
    const { origin, destination, waypoint1, waypoint2, waypoint3, waypoint4, waypoint5 } = getValues();

    setValue('origin', destination, { shouldDirty: true, shouldValidate: true });
    setValue('destination', origin, { shouldDirty: true, shouldValidate: true });

    const waypoints = [waypoint1, waypoint2, waypoint3, waypoint4, waypoint5];
    const filteredWaypoints = waypoints.filter(Boolean);
    filteredWaypoints.reverse();

    if (filteredWaypoints.length <= 1) return;

    for (let i = 0; i < 5; i++) {
      setValue('waypoint' + (i + 1), filteredWaypoints[i] || '', { shouldDirty: true, shouldValidate: true });
    }
  }

  useEffect(() => {
    if (direction === 'roundtrip') {
      setValue('destination.address', originAddress, { shouldDirty: true, shouldValidate: true });
    }
  }, [direction, originAddress, setValue]);

  return {
    fields,
    direction,
    handleAddField,
    handleDeleteField,
    swapOriginAndDestination,
  };
}
