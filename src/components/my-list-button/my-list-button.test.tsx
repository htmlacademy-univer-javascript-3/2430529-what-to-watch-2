import { render, screen } from '@testing-library/react';
import { MyListButton } from '.';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getMockStore } from '../../mocks/mock-store';
import films from '../../mocks/films';
import { AuthorizationStatus } from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('Component: MyListButton', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.Auth));

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter>
        <MyListButton filmId={mockFilm.id} />
      </MemoryRouter>
    </Provider>
  );

  it('should render the button with given children and className', () => {
    const expectedText = 'My list';
    render(fakeApp);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
  });
});
