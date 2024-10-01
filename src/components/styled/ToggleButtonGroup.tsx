'use client';

import { styled } from '@mui/material';
import { ToggleButtonGroup as MuiToggleButtonGroup } from '@mui/material';

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)({
  backgroundColor: 'white',
  textTransform: 'none',
  borderRadius: '16px',
  padding: '8px',
  display: 'flex',
  '& .MuiToggleButton-root': {
    flex: 1,
  },
  '& .MuiToggleButtonGroup-grouped': {
    borderRadius: '12px',
  },
  '& .MuiToggleButtonGroup-grouped:first-of-type': {
    marginRight: '8px',
  },
});
