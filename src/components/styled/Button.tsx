'use client';

import { styled } from '@mui/material';
import { Button as MuiButton } from '@mui/material';

export const Button = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ variant }) => ({
  ...(variant === 'contained' && {
    borderWidth: '2px',
    borderColor: '#06c760',
    borderStyle: 'solid',
    backgroundColor: '#06c760',
    color: 'white',
    borderRadius: '100px',
    padding: '10px 20px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#0000',
      color: '#172039',
      borderWidth: '2px',
      borderColor: '#06c760',
      borderStyle: 'solid',
    },
  }),
  ...(variant === 'outlined' && {
    borderWidth: '2px',
    borderColor: '#06c760',
    borderStyle: 'solid',
    backgroundColor: '#0000',
    color: '#172039',
    borderRadius: '100px',
    padding: '10px 20px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#06c760',
      color: 'white',
      borderWidth: '2px',
      borderColor: '#06c760',
      borderStyle: 'solid',
    },
  }),
  ...(variant === 'text' && {
    textTransform: 'none',
    borderRadius: '100px',
    fontWeight: 'normal',
  }),
}));
