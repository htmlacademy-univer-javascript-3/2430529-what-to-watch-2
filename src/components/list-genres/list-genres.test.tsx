import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { ListGenres } from '.';
import films from '../../mocks/films';
import { AuthorizationStatus } from '../../const';
import { ALL_GENRES } from '../../types/genres';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockFilm = films[0];

describe('Component: ListGenres', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.Auth));

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter>
        <ListGenres films={films} />
      </MemoryRouter>
    </Provider>
  );
  it('should render genres correctly', () => {
    render(fakeApp);
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(ALL_GENRES)).toBeInTheDocument();
  });
});
