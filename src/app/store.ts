import { Directions } from '@/types/Directions';
import { atom } from 'jotai';
import { StopField } from './(home)/_components/TripDestination';

export const directionsAtom = atom<Directions | null>(null);
export const fieldsAtom = atom<StopField[]>([]);
