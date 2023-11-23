import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/films';

export const changeGenre = createAction('changeGenre', (value: string) => ({
  payload: value,
}));
export const getFilmsByGenre = createAction('getFilmsByGenre');

export const setFilms = createAction('setFilms', (value: Films) => ({
  payload: value,
}));
