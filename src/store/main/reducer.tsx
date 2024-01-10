import { createSlice } from '@reduxjs/toolkit';
import { Film, Films, ShortFilm } from '../../types/films';
import { ALL_GENRES } from '../../types/genres';
import { setError, setGenre } from '../action';
import {
  fetchFavoriteFilms,
  fetchFilmsAction,
  fetchPromoFilmAction,
  logoutAction,
  postCommentAction,
  setFavorite,
} from '../api-actions';

export interface MainReducerState {
  films: Films;
  currentGenre: string;
  isFilmsLoading: boolean;
  error: null | string;
  promo: null | Film;
  favoriteFilms: ShortFilm[];
  isPromoLoading: boolean;
}

const initialState: MainReducerState = {
  films: [],
  currentGenre: ALL_GENRES,
  isFilmsLoading: false,
  error: null,
  promo: null,
  favoriteFilms: [],
  isPromoLoading: false,
};

export const mainReducer = createSlice({
  name: 'mainReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGenre, (state, action) => {
        state.currentGenre = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsLoading = false;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsLoading = false;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(fetchFavoriteFilms.rejected, (state) => {
        state.favoriteFilms = [];
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.isPromoLoading = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isPromoLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoLoading = true;
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        if (state.promo && action.payload.id === state.promo.id) {
          state.promo = action.payload;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoriteFilms = [];
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.error = null;
        action.payload.backToFilm();
      });
  },
});
