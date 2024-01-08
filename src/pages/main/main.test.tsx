import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { MainPage } from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import films from '../../mocks/films';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('Page: MainPage', () => {
  const store = mockStore(getMockStore());

  it('should render MainPage correctly', () => {
    const routes = [`${AppRoute.Main}`];

    const fakeApp = (
      <Provider store={store}>
        <MemoryRouter initialEntries={routes}>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    render(fakeApp);

    const title = screen.getByText(/WTW/);
    expect(title).toBeInTheDocument();
  });

  it('should render MainPage with promo films', () => {
    const routes = [`${AppRoute.Main}`];

    const fakeApp = (
      <Provider store={store}>
        <MemoryRouter initialEntries={routes}>
          <Routes>
            <Route path={AppRoute.Main} element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    render(fakeApp);

    const promoReleased = screen.getByText(mockFilm.released);
    expect(promoReleased).toBeInTheDocument();
  });
});
