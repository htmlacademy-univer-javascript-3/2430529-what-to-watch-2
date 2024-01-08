import films from '../../mocks/films';

import { ALL_GENRES } from '../../types/genres';
import { setError, setGenre } from '../action';
import {
  fetchFavoriteFilms,
  fetchFilmsAction,
  fetchPromoFilmAction,
} from '../api-actions';
import { MainReducerState, mainReducer } from './reducer';

const mockFilm = films[0];
const mockFilms = films;

describe('Main reducer', () => {
  let state: MainReducerState;

  beforeEach(() => {
    state = {
      films: [],
      currentGenre: ALL_GENRES,
      isFilmsLoading: false,
      error: null,
      promo: null,
      favoriteFilms: [],
      favoriteCount: 0,
      isPromoLoading: false,
    };
  });

  it('should return initial state with empty action', () => {
    expect(mainReducer.reducer(void 0, { type: '' })).toEqual(state);
  });

  describe('test setGenre', () => {
    it('should set genre', () => {
      expect(
        mainReducer.reducer(state, {
          type: setGenre.type,
          payload: mockFilm.genre,
        }).currentGenre
      ).toEqual(mockFilm.genre);
    });
  });

  describe('test setError', () => {
    it('should set error', () => {
      expect(
        mainReducer.reducer(state, { type: setError.type, payload: '123' })
          .error
      ).toEqual('123');
    });
  });

  describe('test fetchFilms', () => {
    it('should set isLoading true on pending', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchFilmsAction.pending.type,
          payload: mockFilms,
        }).isFilmsLoading
      ).toEqual(true);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchFilmsAction.fulfilled.type,
          payload: mockFilms,
        }).isFilmsLoading
      ).toEqual(false);
    });
    it('should set films on fulfilled', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchFilmsAction.fulfilled.type,
          payload: mockFilms,
        }).films
      ).toEqual(mockFilms);
    });
  });

  describe('fetchFavoriteFilms test', () => {
    it('should set favorite films on fulfilled', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchFavoriteFilms.fulfilled.type,
          payload: mockFilms,
        }).favoriteFilms
      ).toEqual(mockFilms);
    });
    it('should set count of favorite films on fulfilled', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchFavoriteFilms.fulfilled.type,
          payload: mockFilms,
        }).favoriteCount
      ).toEqual(mockFilms.length);
    });
    it('should set favorite films empty on rejected', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchFavoriteFilms.rejected.type,
          payload: mockFilms,
        }).favoriteFilms
      ).toEqual([]);
    });
    it('should set count of favorite films equal 0 on rejected', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchFavoriteFilms.rejected.type,
          payload: mockFilms.length,
        }).favoriteCount
      ).toEqual(0);
    });
  });

  describe('fetchPromo test', () => {
    it('should set promo on fulfilled', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchPromoFilmAction.fulfilled.type,
          payload: mockFilm,
        }).promo
      ).toEqual(mockFilm);
    });

    it('should set isPromoLoading equal true on pending', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchPromoFilmAction.pending.type,
          payload: mockFilm,
        }).isPromoLoading
      ).toEqual(true);
    });

    it('should set isPromoLoading equal false on rejected', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchPromoFilmAction.rejected.type,
          payload: mockFilm,
        }).isPromoLoading
      ).toEqual(false);
    });

    it('should set isPromoLoading equal false on fulfilled', () => {
      expect(
        mainReducer.reducer(state, {
          type: fetchPromoFilmAction.rejected.type,
          payload: mockFilm,
        }).isPromoLoading
      ).toEqual(false);
    });
  });
});
