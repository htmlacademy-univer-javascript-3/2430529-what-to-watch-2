import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { films, promoFilm } from './mocks/films';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promoFilm={promoFilm} films={films} />
    </Provider>
  </React.StrictMode>
);
