import { InputAdornment } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { TextField } from '@/components/form/fields';

export default function Passengers({ className }: { className?: string }) {
  const { register } = useFormContext();

  return (
    <div className={className}>
      <TextField
        fullWidth
        placeholder="0"
        type="number"
        {...register('passengers')}
        slotProps={{
          htmlInput: { style: { textAlign: 'end' } },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#34495e]">
                  <PeopleAltIcon sx={{ fontSize: '16px', color: 'white' }} />
                </div>
                Počet pasažérů
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}
