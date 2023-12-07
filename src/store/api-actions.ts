import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Films } from '../types/films.ts';
import {
  loadFilms,
  setAuthorizationStatus,
  setisLoadingFilms,
} from './action.ts';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user.ts';
import { AuthorizationStatus } from '../const.ts';

export enum APIRoute {
  FilmsService = '/wtw/films',
  Login = '/wtw/login',
  Logout = '/wtw/logout',
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
    await api.get(APIRoute.Login);
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
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    // saveToken(token);
    // eslint-disable-next-line no-console
    console.log(token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    // dispatch(redirectToRoute(AppRoute.Result));
  }
);
