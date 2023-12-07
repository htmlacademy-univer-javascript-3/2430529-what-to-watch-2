import { createReducer } from '@reduxjs/toolkit';
import { ShortFilm } from '../types/films';
import {
  loadFilms,
  setAuthorizationStatus,
  setGenre,
  setisLoadingFilms,
} from './action';
import { ALL_GENRES } from '../types/genres';
import { AuthorizationStatus } from '../const';
// import { films } from '../mocks/films';

type InitialState = {
  genre: string;
  films: ShortFilm[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  films: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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
});
