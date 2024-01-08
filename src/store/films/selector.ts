import { ReducerName } from '../reducer';
import { State } from '../types';

export const FilmsSelector = {
  film: (state: State) => state[ReducerName.Films].film,
  isLoadingFilm: (state: State) => state[ReducerName.Films].isLoading,
  reviews: (state: State) => state[ReducerName.Films].reviews,
  similarFilms: (state: State) => state[ReducerName.Films].similarFilms,
} as const;
