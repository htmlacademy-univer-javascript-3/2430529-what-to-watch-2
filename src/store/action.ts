import { createAction } from '@reduxjs/toolkit';
import { GenresEnum } from '../types/genres';

export const changeGenre = createAction('changeGenre', (value: GenresEnum) => ({
  payload: value,
}));
