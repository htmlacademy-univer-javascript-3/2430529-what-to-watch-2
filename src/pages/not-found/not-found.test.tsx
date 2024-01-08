import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { NotFoundPage } from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Page: NotFoundPage', () => {
  const store = mockStore(getMockStore());

  it('should render NotFoundPage correctly', () => {
    const routes = ['/invalid-path'];

    const fakeApp = (
      <Provider store={store}>
        <MemoryRouter initialEntries={routes}>
          <Routes>
            <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    render(fakeApp);

    const notFoundTitle = screen.getByText('Кажется такой страницы нет');
    const notFoundTestId = screen.getByTestId('not_found');

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundTestId).toBeInTheDocument();
  });
});
