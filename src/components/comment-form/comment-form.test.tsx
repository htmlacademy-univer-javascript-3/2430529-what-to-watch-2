import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { CommentForm } from '.';
import { AuthorizationStatus } from '../../const';
import films from '../../mocks/films';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('Component: CommentForm', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.Auth));

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter>
        <CommentForm filmId={mockFilm.id} />
      </MemoryRouter>
    </Provider>
  );

  it('should render the form elements correctly', () => {
    render(fakeApp);

    const ratingInputs = screen.getAllByRole('radio', { name: /Rating \d/ });
    const reviewTextarea = screen.getByTestId('review-text');
    const submitButton = screen.getByRole('button', { name: /Post/ });

    expect(ratingInputs).toHaveLength(10);
    expect(reviewTextarea).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should update rating and review text when user interacts with the form', async () => {
    render(fakeApp);

    const ratingInputs = screen.getAllByRole('radio', { name: /Rating \d/ });
    const reviewTextarea = screen.getByTestId('review-text');

    const expectedReview = 'This is a review.';

    await userEvent.click(ratingInputs[0]);
    await userEvent.type(reviewTextarea, expectedReview);

    expect(ratingInputs[0]).toBeChecked();
    expect(reviewTextarea).toHaveValue('This is a review.');
  });

  it('should disable submit button when rating and review text are not set correctly', async () => {
    render(fakeApp);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    const ratingInputs = screen.getAllByRole('radio', { name: /Rating \d/ });
    const reviewTextarea = screen.getByTestId('review-text');

    const expectedReview = 'This is a review.';

    expect(submitButton).toBeDisabled();

    await userEvent.click(ratingInputs[0]);
    await userEvent.type(reviewTextarea, expectedReview);

    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when rating and review text are set correctly', async () => {
    render(fakeApp);

    const submitButton = screen.getByRole('button', { name: 'Post' });
    const ratingInputs = screen.getAllByRole('radio', { name: /Rating \d/ });
    const reviewTextarea = screen.getByTestId('review-text');

    const expectedReview =
      'test test test test test test test test test test test test test test test test test test test test';

    await userEvent.click(ratingInputs[5]);
    await userEvent.type(reviewTextarea, expectedReview);

    expect(submitButton).not.toBeDisabled();
  });
});
