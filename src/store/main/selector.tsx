import { ReducerName } from '../reducer';
import { State } from '../types';

export const MainSelector = {
  films: (state: State) => state[ReducerName.Main].films,
  favoriteFilms: (state: State) => state[ReducerName.Main].favoriteFilms,
  favoriteCount: (state: State) => state[ReducerName.Main].favoriteCount,
} as const;
