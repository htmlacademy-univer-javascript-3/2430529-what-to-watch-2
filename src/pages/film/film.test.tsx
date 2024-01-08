import { render, screen, waitFor } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { FilmPage } from '.';
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

describe('Page: FilmPage', () => {
  const store = mockStore(getMockStore());

  it('should render FilmPage correctly', async () => {
    const routes = [`${AppRoute.Film.replace(':id', mockFilm.id)}`];

    const fakeApp = (
      <Provider store={store}>
        <MemoryRouter initialEntries={routes}>
          <Routes>
            <Route path={AppRoute.Film} element={<FilmPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    render(fakeApp);

    await waitFor(() => {
      const filmTitle = screen.getByText(mockFilm.name);
      expect(filmTitle).toBeInTheDocument();
    });

    const genreFilm = screen.getByText(mockFilm.genre);
    expect(genreFilm).toBeInTheDocument();
  });
});
