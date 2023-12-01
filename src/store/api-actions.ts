import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { Films } from '../types/films.ts';
import { loadFilms } from './action.ts';

export enum APIRoute {
  FilmsService = '/wtw/films',
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
  //   dispatch(setQuestionsDataLoadingStatus(true));
  const { data } = await api.get<Films>(APIRoute.FilmsService);
  //   dispatch(setQuestionsDataLoadingStatus(false));
  dispatch(loadFilms(data));
});
