import { LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/cs';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { DateTimePicker } from '@/components/form/fields';

export default function DestinationTime({ name, className }: { name: string; className?: string }) {
  const { setValue, watch } = useFormContext();
  const value: Date | null = watch(name);

  function onChange(value: dayjs.Dayjs | null) {
    setValue(name, value?.toDate(), { shouldDirty: true, shouldValidate: true });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
      <div className={className}>
        <div className="w-full first:border-0 first:border-r first:border-solid first:border-gray-100">
          <DateTimePicker
            minDateTime={dayjs(Date.now())}
            value={value ? dayjs(value) : null}
            onChange={onChange}
            slotProps={{
              textField: {
                InputProps: {
                  startAdornment: <span className="mr-2 text-gray-400">Odjezd</span>,
                },
                fullWidth: true,
              },
            }}
            name={name}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
