import { createReducer } from '@reduxjs/toolkit';
import { ShortFilm } from '../types/films';
import { setFilms, setGenre } from './action';
import { ALL_GENRES } from '../types/genres';
import { films } from '../mocks/films';

type InitialState = {
  genre: string;
  films: ShortFilm[];
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  films: films,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(setFilms, (state, action) => {
    state.films = action.payload;
  });
});
