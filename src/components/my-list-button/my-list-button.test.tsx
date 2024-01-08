import { render } from '@testing-library/react';
import { MyListButton } from '.';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import films from '../../mocks/films';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockFilm = films[0];

describe('Button component', () => {
  it('should render the button with given children and className', () => {
    const store = mockStore({
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: '', avatarUrl: '', name: '', token: '' },
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

    const { getByText } = render(<MyListButton filmId={'2'}></MyListButton>);

    const button = getByText(children);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('film-card__button');
    expect(button).toHaveClass(className);
  });
});
