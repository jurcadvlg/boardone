import { styled } from '@mui/material';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers';

export const DateTimePicker = styled(MuiDateTimePicker)({
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    borderRadius: '1rem',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
    borderWidth: '1px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
    borderWidth: '1px',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray',
    borderWidth: '1px',
  },
});
