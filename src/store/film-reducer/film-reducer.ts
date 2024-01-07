import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../reducer';
import {
  fetchFilmByIdAction,
  fetchReviews,
  fetchSimilarFilmsAction,
  setFavorite,
} from '../api-actions';
import { Film, ShortFilm } from '../../types/films';
import { Review } from '../../types/review';

type FilmReducerState = {
  film: Film | null;
  reviews: Review[];
  similarFilms: ShortFilm[];
  isLoading: boolean;
};

const initialState: FilmReducerState = {
  film: null,
  reviews: [],
  similarFilms: [],
  isLoading: false,
};

export const filmReducer = createSlice({
  name: ReducerName.Films,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilmByIdAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
