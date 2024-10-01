'use client';

import { styled } from '@mui/material';
import { ToggleButton as MuiToggleButton } from '@mui/material';

export const ToggleButton = styled(MuiToggleButton)({
  backgroundColor: 'white',
  paddingTop: '8px',
  paddingBottom: '8px',
  textTransform: 'none',
  fontWeight: 'normal',
  border: 'none',
  '&.Mui-selected': {
    backgroundColor: '#06c760',
    color: 'white',
  },
  '&:hover': {
    backgroundColor: '#06c76020',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#06c76090',
  },
});
