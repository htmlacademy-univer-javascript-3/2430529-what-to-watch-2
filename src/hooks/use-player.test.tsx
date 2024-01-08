import { JSX } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { renderHook } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { usePlayer } from './use-player';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { ReducerName } from '../store/reducer';
import { AuthorizationStatus } from '../const';
import films from '../mocks/films';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const mockFilm = films[0];

const store = mockStore({
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
const wrapper = ({ children }: { children: JSX.Element }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

describe('usePlayer hook', () => {
  it('should update progress state when handleTimeUpdate is called', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current.progress).toBe(0);
  });
});
