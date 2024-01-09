import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { AuthorizationStatus } from '../../const';
import films from '../../mocks/films';
import { State } from '../../store/types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Routers } from './routers';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('logged in routing', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.Auth));

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <Routers />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render main page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
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
    const expectedTestId = 'not_found';
    routes.push('/asdasd');
    render(fakeApp);
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});

describe('not logged in routing', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.NoAuth));

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <Routers />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render login page when navigated to "/login"', () => {
    routes.push('/login');
    const loginText = 'Email address';
    const passwordText = 'Password';

    render(fakeApp);
    const emailInput = screen.getByPlaceholderText(loginText);
    const passwordInput = screen.getByPlaceholderText(passwordText);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
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
    const expectedTestId = 'not_found';
    routes.push('/qwertasdfg');
    render(fakeApp);
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
