import { render, screen } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import userEvent from '@testing-library/user-event';
import { SingInPage } from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Page: SignIn', () => {
  const store = mockStore(getMockStore());

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <Routes>
          <Route path="*" element={<SingInPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  it('should render correctly', () => {
    const loginText = 'Email address';
    const passwordText = 'Password';

    render(fakeApp);
    const emailInput = screen.getByPlaceholderText(loginText);
    const passwordInput = screen.getByPlaceholderText(passwordText);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'login';
    const passwordElementTestId = 'password';
    const expectedLoginValue = 'test@mail.ru';
    const expectedPasswordValue = 'Password1';

    render(fakeApp);

    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
