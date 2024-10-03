'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLoadScript, Libraries } from '@react-google-maps/api';

type GoogleMapsContextType = {
  isLoaded: boolean;
};

const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(undefined);

const libraries: Libraries = ['places', 'routes'];

export const GoogleMapsProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string,
    libraries,
    language: 'cs',
  });

  return <GoogleMapsContext.Provider value={{ isLoaded }}>{children}</GoogleMapsContext.Provider>;
};

export const useGoogleMaps = (): GoogleMapsContextType => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};
