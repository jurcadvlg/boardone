import { atom } from 'jotai';
import { StopField } from './(home)/_components/StepDestinations/Destinations';
import { Calculation } from './api/trip/calculate/route';

export enum SubmitType {
  Submit,
  Save,
}

export const fieldsAtom = atom<StopField[]>([]);
export const calculationAtom = atom<Calculation | null>(null);
export const submitTypeAtom = atom<SubmitType>(SubmitType.Submit);
