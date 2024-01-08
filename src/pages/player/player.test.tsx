import { render, screen, waitFor } from '@testing-library/react';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { getMockStore } from '../../mocks/mock-store';
import { PlayerPage } from '.';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../store/types';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import films from '../../mocks/films';
import userEvent from '@testing-library/user-event';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('Page: PlayerPage', () => {
  const store = mockStore(getMockStore(AuthorizationStatus.Auth));

  const routes = [`${AppRoute.Player.replace(':id', mockFilm.id)}`];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <Routes>
          <Route path={AppRoute.Player} element={<PlayerPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  it('should render PlayerPage correctly', async () => {
    render(fakeApp);

    await waitFor(() => {
      const videoPlayer = screen.getByTestId('video-player');
      expect(videoPlayer).toBeInTheDocument();

      const exitButton = screen.getByText('Exit');
      expect(exitButton).toBeInTheDocument();

      const playButton = screen.getByText('Play');
      expect(playButton).toBeInTheDocument();
    });
  });

  it('toggles play/pause when play button is clicked', async () => {
    render(fakeApp);

    const playButton = screen.getByTestId('play-button');
    const videoPlayer: HTMLVideoElement = screen.getByTestId('video-player');

    expect(videoPlayer.paused).toBe(true);

    await userEvent.click(playButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoPlayer.paused).toBe(false);
      }, 1000);
    });
  });
});
