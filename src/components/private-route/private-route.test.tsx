import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { PrivateRoute } from './private-route';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { ReducerName } from '../../store/reducer';
import { AuthorizationStatus } from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);
const store = mockStore({
  [ReducerName.Films]: {
    film: null,
    isLoading: false,
  },
  [ReducerName.Authorzation]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      email: 'john@example.com',
      token: '123433',
    },
  },
});
describe('PrivateRoute component', () => {
  it('should render children if user is authorized', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute>
            <div>Private content</div>
          </PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(queryByText('Private content')).toBeInTheDocument();
    expect(queryByText('Sign in')).not.toBeInTheDocument();
  });
});
