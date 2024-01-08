import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Tabs } from '.';
import { AuthorizationStatus } from '../../const';
import films from '../../mocks/films';
import reviews from '../../mocks/reviews';
import { TypeTab } from './tabs';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('Component: Tabs', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.Auth));

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter>
        <Tabs film={mockFilm} reviews={reviews} />
      </MemoryRouter>
    </Provider>
  );
  it('should render for Tabs correctly', () => {
    render(fakeApp);

    expect(screen.getByText(TypeTab.Overview)).toBeInTheDocument();
    expect(screen.getByText(TypeTab.Details)).toBeInTheDocument();
    expect(screen.getByText(TypeTab.Reviews)).toBeInTheDocument();
  });

  it('should render Details Tab', async () => {
    render(fakeApp);

    const detailsButton = screen.getByTestId(`nav-btn-${TypeTab.Details}`);
    await userEvent.click(detailsButton);

    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Run Time')).toBeInTheDocument();
  });

  it('should render Reviews Tab', async () => {
    render(fakeApp);

    const reviewsButton = screen.getByTestId(`nav-btn-${TypeTab.Reviews}`);
    await userEvent.click(reviewsButton);

    expect(screen.getByText(reviews[0].user)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
  });
});
