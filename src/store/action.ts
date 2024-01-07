import { createAction } from '@reduxjs/toolkit';
import { Film, Films, PromoFilm, ShortFilm } from '../types/films';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user';
import { Review } from '../types/review';

export const setGenre = createAction('setGenre', (value: string) => ({
  payload: value,
}));

export const setError = createAction('setError', (error: string | null) => ({
  payload: error,
}));

export const loadFilms = createAction<Films>('loadFilms');

export const setisLoadingFilms = createAction<boolean>('setisLoadingFilms');

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'setAuthorizationStatus'
);

export const setUser = createAction<UserData>('setUser');

export const setPromoFilm = createAction<PromoFilm>('setPromoFilm');

export const setFilm = createAction<Film>('setFilm');
export const setIsLoadingFilm = createAction<boolean>('setIsLoadingFilm');
export const setIsErrorFilm = createAction<boolean>('setIsErrorFilm');

export const setSimilarFilms = createAction<ShortFilm[]>('setSimilarFilms');
export const setReviews = createAction<Review[]>('setReviews');
