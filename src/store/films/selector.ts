import { ReducerName } from '../reducer';
import { State } from '../types';

export const FilmsSelector = {
  film: (state: State) => state[ReducerName.Films].film,
  reviews: (state: State) => state[ReducerName.Films].reviews,
} as const;
