import { createAction } from '@reduxjs/toolkit';
import { Film, Films, PromoFilm, ShortFilm } from '../types/films';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user';
import { Review } from '../types/review';

export const setGenre = createAction('data/setGenre', (value: string) => ({
  payload: value,
}));

export const setError = createAction(
  'data/setError',
  (error: string | null) => ({
    payload: error,
  })
);

export const loadFilms = createAction<Films>('data/loadFilms');

export const setisLoadingFilms = createAction<boolean>(
  'data/setisLoadingFilms'
);

export const setAuthorizationStatus = createAction<AuthorizationStatus>(
  'user/setAuthorizationStatus'
);

export const setUser = createAction<UserData>('user/set');

export const setPromoFilm = createAction<PromoFilm>('data/setPromo');

export const setFilm = createAction<Film>('data/setFilm');
export const setIsLoadingFilm = createAction<boolean>('data/setIsLoadingFilm');
export const setIsErrorFilm = createAction<boolean>('data/setIsErrorFilm');

export const setSimilarFilms = createAction<ShortFilm[]>('setSimilarFilms');
export const setReviews = createAction<Review[]>('data/setReviews');
