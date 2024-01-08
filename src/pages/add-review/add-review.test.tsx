import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { AddReviewPage } from '.';
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

describe('Page: AddReviewPage', () => {
  const store = mockStore(getMockStore());

  it('should render AddReviewPage correctly', () => {
    const routes = [`${AppRoute.AddReview.replace(':id', mockFilm.id)}`];

    const fakeApp = (
      <Provider store={store}>
        <MemoryRouter initialEntries={routes}>
          <Routes>
            <Route path={AppRoute.AddReview} element={<AddReviewPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    render(fakeApp);

    const addReviewForm = screen.getByText(/Add review/);
    expect(addReviewForm).toBeInTheDocument();
  });
});
