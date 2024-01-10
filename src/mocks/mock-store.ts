import { AuthorizationStatus } from '../const';
import { ReducerName } from '../store/reducer';
import { ALL_GENRES } from '../types/genres';
import films from './films';
import reviews from './reviews';

const mockFilm = films[0];

export function getMockStore(authorizationStatus?: AuthorizationStatus) {
  return {
    [ReducerName.Authorzation]: {
      authorizationStatus: authorizationStatus ?? AuthorizationStatus.NoAuth,
      user: {
        email: 'test@mail.ru',
        avatarUrl: 'path/path.jpg',
        name: 'TestName',
        token: 'token',
      },
    },
    [ReducerName.Films]: {
      film: mockFilm,
      reviews: reviews,
      similarFilms: [],
      isLoading: false,
    },
    [ReducerName.Main]: {
      films: [mockFilm],
      currentGenre: ALL_GENRES,
      isFilmsLoading: false,
      isPromoLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [mockFilm],
    },
  };
}
