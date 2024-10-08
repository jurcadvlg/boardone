'use client';

import { styled } from '@mui/material';
import { TextField as MuiTextField } from '@mui/material';

export const TextField = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: 'white',
    },
    '&.Mui-disabled fieldset': {
      borderColor: 'white',
    },
  },
});
