import { createReducer } from '@reduxjs/toolkit';
import { ShortFilm } from '../types/films';
import { loadFilms, setFilms, setGenre, setisLoadingFilms } from './action';
import { ALL_GENRES } from '../types/genres';
// import { films } from '../mocks/films';

type InitialState = {
  genre: string;
  films: ShortFilm[];
  isLoading: boolean;
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  films: [],
  isLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(setFilms, (state, action) => {
    state.films = action.payload;
  });
  builder.addCase(loadFilms, (state, action) => {
    state.films = action.payload;
  });
  builder.addCase(setisLoadingFilms, (state, action) => {
    state.isLoading = action.payload;
  });
});
