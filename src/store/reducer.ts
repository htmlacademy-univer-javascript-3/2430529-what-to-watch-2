import { createReducer } from '@reduxjs/toolkit';
import { Films } from '../types/films';
import { changeGenre, getFilmsByGenre, setFilms } from './action';
import { ALL_GENRES } from '../types/genres';

type InitialState = {
  genre: string;
  films: Films;
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  films: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(getFilmsByGenre, (state) => {
    state.films = state.films.filter((film) => film.genre === state.genre);
  });
  builder.addCase(setFilms, (state, action) => {
    state.films = action.payload;
  });
});
