import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Film, Films, ShortFilm } from '../types/films.ts';
import {
  loadFilms,
  setAuthorizationStatus,
  setFilm,
  setIsErrorFilm,
  setIsLoadingFilm,
  setPromoFilm,
  setReviews,
  setSimilarFilms,
  setUser,
  setisLoadingFilms,
} from './action.ts';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user.ts';
import { AuthorizationStatus } from '../const.ts';
import { dropToken, saveToken } from '../services/token.ts';
import { Review } from '../types/review.ts';

export enum APIRoute {
  FilmsService = '/films',
  PromoFilm = '/promo',
  FilmById = '/films/',
  ReviewService = '/comments/',
  Login = '/login',
  Logout = '/logout',
}

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  dispatch(setisLoadingFilms(true));
  const { data } = await api.get<Films>(APIRoute.FilmsService);
  dispatch(setisLoadingFilms(false));
  dispatch(loadFilms(data));
});

export const fetchPromoFilmAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Film>(APIRoute.PromoFilm);
  dispatch(setPromoFilm(data));
});

export const fetchFilmByIdAction = createAsyncThunk<
  void,
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilmById', async (arg, { dispatch, extra: api }) => {
  dispatch(setIsLoadingFilm(true));
  try {
    const { data } = await api.get<Film>(`${APIRoute.FilmById}${arg.filmId}`);
    dispatch(setFilm(data));
    dispatch(setIsErrorFilm(false));
  } catch {
    dispatch(setIsErrorFilm(true));
  }
  dispatch(setIsLoadingFilm(false));
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (arg, { dispatch, extra: api }) => {
  const { data } = await api.get<ShortFilm[]>(
    `${APIRoute.FilmById}${arg.filmId}/similar`
  );
  dispatch(setSimilarFilms(data));
});

export const fetchReviewes = createAsyncThunk<
  void,
  { filmId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async (arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Review[]>(
    `${APIRoute.ReviewService}${arg.filmId}`
  );
  dispatch(setReviews(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    dispatch(setUser(data));
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
});
