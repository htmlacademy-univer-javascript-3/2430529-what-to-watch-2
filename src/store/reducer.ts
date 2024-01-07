import { createReducer } from '@reduxjs/toolkit';
import { Film, PromoFilm, ShortFilm } from '../types/films';
import {
  loadFilms,
  setAuthorizationStatus,
  setFilm,
  setGenre,
  setPromoFilm,
  setReviews,
  setSimilarFilms,
  setUser,
  setisLoadingFilms,
} from './action';
import { ALL_GENRES } from '../types/genres';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user';
import { Review } from '../types/review';
// import { films } from '../mocks/films';

type InitialState = {
  genre: string;
  films: ShortFilm[];
  film: Film | null;
  isLoadingFilm: boolean;
  isErrorFilm: boolean;
  similarFilms: ShortFilm[];
  reviwes: Review[];
  promoFilm: PromoFilm | null;
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: InitialState = {
  genre: ALL_GENRES,
  films: [],
  film: null,
  isLoadingFilm: false,
  isErrorFilm: false,
  similarFilms: [],
  reviwes: [],
  promoFilm: null,
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setGenre, (state, action) => {
    state.genre = action.payload;
  });
  builder.addCase(loadFilms, (state, action) => {
    state.films = action.payload;
  });
  builder.addCase(setisLoadingFilms, (state, action) => {
    state.isLoading = action.payload;
  });
  builder.addCase(setAuthorizationStatus, (state, action) => {
    state.authorizationStatus = action.payload;
  });
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(setPromoFilm, (state, action) => {
    state.promoFilm = action.payload;
  });
  builder.addCase(setFilm, (state, action) => {
    state.film = action.payload;
  });
  builder.addCase(setSimilarFilms, (state, action) => {
    state.similarFilms = action.payload; //setReviews
  });
  builder.addCase(setReviews, (state, action) => {
    state.reviwes = action.payload;
  });
});
