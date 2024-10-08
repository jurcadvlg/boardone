import React from 'react';
import { TextFieldProps } from '@mui/material';
import { TextField as StyledTextField } from '@/components/styled';
import { useFormContext } from 'react-hook-form';
import { getFieldError } from '@/utils/getFieldError';

type Props = {
  name: string;
} & TextFieldProps;

const TextField = React.forwardRef<HTMLInputElement, Props>(({ name, ...props }, ref) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = getFieldError(name, errors);

  return <StyledTextField {...props} name={name} ref={ref} error={!!error} helperText={error?.message?.toString()} />;
});

TextField.displayName = 'TextField';

export default TextField;
