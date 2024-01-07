import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Film, Films, ShortFilm } from '../types/films.ts';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user.ts';

import { CommentForm, Review } from '../types/review.ts';

export enum APIRoute {
  FilmsService = '/films',
  Favorite = '/favorite',
  PromoFilm = '/promo',
  FilmById = '/films/',
  ReviewService = '/comments/',
  Login = '/login',
  Logout = '/logout',
}

export const fetchFilmsAction = createAsyncThunk<
  Films,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<Films>(APIRoute.FilmsService);
  return data;
});

export const fetchPromoFilmAction = createAsyncThunk<
  Film,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { extra: api }) => {
  const { data } = await api.get<Film>(APIRoute.PromoFilm);
  return data;
});

export const fetchFavoriteFilms = createAsyncThunk<
  ShortFilm[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/favorite', async (_arg, { extra: api }) => {
  const { data } = await api.get<ShortFilm[]>(APIRoute.Favorite);
  return data;
});

export const fetchFilmByIdAction = createAsyncThunk<
  Film,
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilmById', async (arg, { extra: api }) => {
  const { data } = await api.get<Film>(`${APIRoute.FilmById}${arg.filmId}`);
  return data;
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  ShortFilm[],
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (arg, { extra: api }) => {
  const { data } = await api.get<ShortFilm[]>(
    `${APIRoute.FilmById}${arg.filmId}/similar`
  );
  return data;
});

export const fetchReviews = createAsyncThunk<
  Review[],
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async ({ filmId: filmId }, { extra: api }) => {
  const { data } = await api.get<Review[]>(
    `${APIRoute.ReviewService}${filmId}`
  );
  return data;
});

export const setFavorite = createAsyncThunk<
  Film,
  { status: boolean; filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('/favorite/id/status', async ({ status, filmId }, { extra: api }) => {
  const { data } = await api.post<Film>(
    `${APIRoute.Favorite}/${filmId}/${status ? 1 : 0}`
  );
  return data;
});

export interface IAddReview {
  data: Review;
  backToFilm: () => void;
}

export const postCommentAction = createAsyncThunk<
  IAddReview,
  CommentForm,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'reviews/postComment',
  async ({ id, comment, rating, backToFilm }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.ReviewService}${id}`, {
      comment,
      rating,
    });
    return { data, backToFilm };
  }
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});
