import React from 'react';
import { DateTimePicker as StyledDateTimePicker } from '@/components/styled';
import { useFormContext } from 'react-hook-form';
import { getFieldError } from '@/utils/getFieldError';
import { DateTimePickerProps } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type Props = {
  name: string;
} & DateTimePickerProps<dayjs.Dayjs, boolean>;

const DateTimePicker = React.forwardRef<HTMLInputElement, Props>(({ name, ...props }, ref) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = getFieldError(name, errors);

  return (
    <StyledDateTimePicker
      {...props}
      name={name}
      ref={ref}
      slotProps={{
        ...props.slotProps,
        textField: {
          ...props.slotProps?.textField,
          error: !!error,
          helperText: error?.message?.toString(),
        },
      }}
    />
  );
});

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
