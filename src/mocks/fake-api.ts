import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { State } from '../store/types';
import films from './films';
import { ReducerName } from '../store/reducer';
import { AuthorizationStatus } from '../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockFilm = films[0];

export const storeAuthorization = mockStore({
  [ReducerName.Films]: {
    film: mockFilm,
    isLoading: false,
  },
  [ReducerName.Authorzation]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      email: 'john@example.com',
      token: '123433',
    },
  },
});
