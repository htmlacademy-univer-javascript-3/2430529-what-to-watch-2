import { createReducer } from '@reduxjs/toolkit';
import { GenresEnum } from '../types/genres';
import { Films } from '../types/films';
import { changeGenre } from './action';

type InitialState = {
  genre: GenresEnum;
  films: Films;
};

const initialState: InitialState = {
  genre: GenresEnum.Drama,
  films: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.genre = action.payload;
  });
});
