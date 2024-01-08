import films from '../../mocks/films';
import reviews from '../../mocks/reviews';
import { fetchFilmByIdAction, fetchReviews, fetchSimilarFilmsAction } from '../api-actions';
import { FilmReducerState, filmReducer } from './reducer';

const mockFilm = films[0];
const mockFilms = films;
const mockReviews = reviews;

describe('Films reducer', () => {
  let state: FilmReducerState;

  beforeEach(() => {
    state = {
      film: null,
      reviews: [],
      similarFilms: [],
      isLoading: false,
    };
  });

  it('should return default initial state', () => {
    const emptyAction = { type: '' };
    const result = filmReducer.reducer(undefined, emptyAction);
    expect(result).toEqual(state);
  });

  describe('Fetch film by id test', () => {
    it('should set isLoading on pending', () => {
      expect(
        filmReducer.reducer(state, {
          type: fetchFilmByIdAction.pending.type,
          payload: mockFilm,
        }).isLoading
      ).toEqual(true);
    });

    it('should load film on fulfilled', () => {
      expect(
        filmReducer.reducer(state, {
          type: fetchFilmByIdAction.fulfilled.type,
          payload: mockFilm,
        }).film
      ).toEqual(mockFilm);
    });
    it('should set isLoading false on fulfilled', () => {
      expect(
        filmReducer.reducer(state, {
          type: fetchFilmByIdAction.fulfilled.type,
          payload: mockFilm,
        }).isLoading
      ).toEqual(false);
    });
  });

  describe('fetchSimilar test', () => {
    it('should load similar films on fulfilled', () => {
      expect(
        filmReducer.reducer(state, {
          type: fetchSimilarFilmsAction.fulfilled.type,
          payload: mockFilms,
        }).similarFilms
      ).toEqual(mockFilms);
    });
  });

  describe('fetchReviews test', () => {
    it('should load reviews on fulfilled', () => {
      expect(
        filmReducer.reducer(state, {
          type: fetchReviews.fulfilled.type,
          payload: mockReviews,
        }).reviews
      ).toMatchObject(mockReviews);
    });
  });
});
