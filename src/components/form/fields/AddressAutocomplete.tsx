import { Autocomplete, debounce, InputAdornment } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { PlacePrediction } from '@/types/PlacePrediction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import { useGoogleMaps } from '../../providers/GoogleMapsProvider';
import { TextField } from '../../styled';
import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  type: 'origin' | 'waypoint' | 'destination';
  placeholder?: string;
  number?: number;
};

export default function AddressAutocomplete({ name, placeholder, type, number }: Props) {
  const { watch, setValue } = useFormContext();
  const value: string = watch(name);

  const [options, setOptions] = useState<PlacePrediction[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [autocompleteService, setAutocompleteService] = useState<any>();

  const { isLoaded } = useGoogleMaps();

  useEffect(() => {
    if (isLoaded && !autocompleteService) {
      setAutocompleteService(new window.google.maps.places.AutocompleteService());
    }
  }, [autocompleteService, isLoaded]);

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.getPlacePredictions(request, callback);
      }, 200),
    [autocompleteService]
  );

  useEffect(() => {
    if (!value || value.length < 3) {
      return;
    }

    if (!autocompleteService) {
      return;
    }

    if (value === '') {
      setOptions([]);
      return;
    }

    fetch({ input: value }, (results: PlacePrediction[]) => {
      let newOptions: PlacePrediction[] = [];

      if (results) {
        newOptions = [...newOptions, ...results];
      }

      setOptions(newOptions);
    });
  }, [autocompleteService, fetch, value]);

  let adornment = <></>;
  switch (type) {
    case 'origin':
      adornment = (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9b59b6]">
          <LocationOnIcon sx={{ fontSize: '16px', color: 'white' }} />
        </div>
      );
      break;

    case 'destination':
      adornment = (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3498db]">
          <FlagIcon sx={{ fontSize: '16px', color: 'white' }} />
        </div>
      );
      break;

    case 'waypoint':
      adornment = (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fdcb6e]">
          <span className="text-base font-bold text-white">{number}</span>
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <Autocomplete
      fullWidth
      disablePortal
      freeSolo
      id={name}
      includeInputInList
      options={options}
      getOptionKey={(option) => {
        return typeof option === 'string' ? option : option.place_id;
      }}
      getOptionLabel={(option) => {
        return typeof option === 'string' ? option : option.description;
      }}
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(_, newValue: any) => {
        if (newValue?.place_id) {
          setValue(name, newValue.description, { shouldDirty: true });
        } else {
          setValue(name, '', { shouldDirty: true });
        }
      }}
      onInputChange={(_, newInputValue) => {
        setValue(name, newInputValue, { shouldDirty: true });
      }}
      renderInput={(params) => (
        <TextField
          variant="outlined"
          placeholder={placeholder}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
              endAdornment: null,
            },
          }}
          {...params}
          fullWidth
        />
      )}
    />
  );
}
