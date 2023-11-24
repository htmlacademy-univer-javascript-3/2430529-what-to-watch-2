import { createAction } from '@reduxjs/toolkit';
import { Films } from '../types/films';

export const setGenre = createAction('setGenre', (value: string) => ({
  payload: value,
}));

export const setFilms = createAction('setFilms', (value: Films) => ({
  payload: value,
}));
