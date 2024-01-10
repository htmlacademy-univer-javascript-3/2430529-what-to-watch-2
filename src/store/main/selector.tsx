import { ReducerName } from '../reducer';
import { State } from '../types';

export const MainSelector = {
  films: (state: State) => state[ReducerName.Main].films,
  promo: (state: State) => state[ReducerName.Main].promo,
  currentGenre: (state: State) => state[ReducerName.Main].currentGenre,
  isPromoLoading: (state: State) => state[ReducerName.Main].isPromoLoading,
  isFilmsLoading: (state: State) => state[ReducerName.Main].isFilmsLoading,
  error: (state: State) => state[ReducerName.Main].error,
  favoriteFilms: (state: State) => state[ReducerName.Main].favoriteFilms,
} as const;
