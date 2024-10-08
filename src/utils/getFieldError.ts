import { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

function isFieldError(error: FieldError | FieldErrors): error is FieldError {
  return error && typeof error === 'object' && 'type' in error;
}

export function getFieldError(name: string, errors: FieldErrors) {
  return name.split('.').reduce<FieldErrors<FieldValues> | FieldError | undefined>((acc, curr) => {
    if (acc && isFieldError(acc)) {
      return acc;
    }
    return acc ? acc[curr] : undefined;
  }, errors);
}
