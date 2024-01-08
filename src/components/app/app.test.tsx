import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import App from './app';
import { ToastContainer } from 'react-toastify';
import { createAPI } from '../../services/api';
import { ReducerName } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';
import films from '../../mocks/films';
import { State } from '../../types/state';
import { ALL_GENRES } from '../../types/genres';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('logged in routing', () => {
  const store = mockStore({
    [ReducerName.Authorzation]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
    },
    [ReducerName.Films]: {
      film: mockFilm,
      reviews: [],
      similarFilms: [],
      isLoading: false,
    },
    [ReducerName.Main]: {
      films: [mockFilm],
      currentGenre: ALL_GENRES,
      isFilmsLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <App />
        <ToastContainer position="bottom-right" />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render main page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it('should render reviews editor when navigated to "/films/{id}/review"', () => {
    routes.push('/films/1/review');
    render(fakeApp);
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render favorites list when navigated to "/mylist"', () => {
    routes.push('/mylist');
    render(fakeApp);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/asdasd');
    render(fakeApp);
    expect(screen.getByText('Кажется такой страницы нет')).toBeInTheDocument();
  });
});

describe('not logged in routing', () => {
  const store = mockStore({
    [ReducerName.Authorzation]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
    [ReducerName.Films]: {
      film: mockFilm,
      reviews: [],
      similarFilms: [],
      isLoading: false,
    },
    [ReducerName.Main]: {
      films: [mockFilm],
      currentGenre: ALL_GENRES,
      isFilmsLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render login page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/2019 What to watch Ltd./i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/qwertasdfg');
    render(fakeApp);
    expect(screen.getByText('Кажется такой страницы нет')).toBeInTheDocument();
  });
});
