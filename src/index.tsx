import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { store } from './store';
import {
  checkAuthAction,
  fetchFavoriteFilms,
  fetchFilmsAction,
  fetchPromoFilmAction,
} from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(fetchFavoriteFilms());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
