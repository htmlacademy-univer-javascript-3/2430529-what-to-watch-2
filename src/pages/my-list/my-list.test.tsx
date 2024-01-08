import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { MyListPage } from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import films from '../../mocks/films';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('Page: MyListPage', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.Auth));

  const routes = [`${AppRoute.MyList}`];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <Routes>
          <Route path={AppRoute.MyList} element={<MyListPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  it('should render MyListPage correctly', () => {
    render(fakeApp);

    const favoriteNameOfFilm = screen.getByText(mockFilm.name);
    expect(favoriteNameOfFilm).toBeInTheDocument();

    const favoriteCountOfFilm = screen.getByText([mockFilm].length);
    expect(favoriteCountOfFilm).toBeInTheDocument();
  });

});
