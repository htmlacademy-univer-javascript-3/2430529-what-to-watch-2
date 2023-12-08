import { createReducer } from '@reduxjs/toolkit';
import { ShortFilm } from '../types/films';
import {
  loadFilms,
  setAuthorizationStatus,
  setGenre,
  setUser,
  setisLoadingFilms,
} from './action';
import { ALL_GENRES } from '../types/genres';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user';
// import { films } from '../mocks/films';

type InitialState = {
  genre: string;
  films: ShortFilm[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  films: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(loadFilms, (state, action) => {
    state.films = action.payload;
  });
  builder.addCase(setisLoadingFilms, (state, action) => {
    state.isLoading = action.payload;
  });
  builder.addCase(setAuthorizationStatus, (state, action) => {
    state.authorizationStatus = action.payload;
  });
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});
