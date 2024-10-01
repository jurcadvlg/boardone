'use client';

import { styled } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';

export const TextField = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    '& fieldset': {
      borderColor: 'white'
    },
    '&:hover fieldset': {
      borderColor: 'white'
    },
    '&.Mui-focused fieldset': {
      borderColor: 'gray',
      borderWidth: '1px'
    }
  }
});
