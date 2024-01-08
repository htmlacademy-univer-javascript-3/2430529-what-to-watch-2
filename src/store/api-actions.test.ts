import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { createAPI } from '../services/api';

import {
  setFavorite,
  checkAuthAction,
  fetchReviews,
  fetchFavoriteFilms,
  fetchFilmByIdAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  loginAction,
  logoutAction,
  postCommentAction,
} from './api-actions';
import { AuthData } from '../types/auth-data';
import films from '../mocks/films';
import reviews from '../mocks/reviews';
import { State } from './types';
import { FilmStatus } from '../const';

describe('async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilm = films[0];
  const mockFilms = films;
  const mockReviews = reviews;
  const mockAuthorizationData: AuthData = {
    login: '123@gmail.com',
    password: '123',
  };

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('authorization status is Auth when server returned 200', async () => {
    const store = mockStore();
    mockAPI.onGet('/login').reply(200);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch login when POST /login', async () => {
    mockAPI.onPost('/login').reply(200, { token: 'token' });

    const store = mockStore();

    await store.dispatch(loginAction(mockAuthorizationData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
    ]);
  });

  it('should dispatch logout on DELETE /logout', async () => {
    mockAPI.onDelete('/logout').reply(204);

    const store = mockStore();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });

  it('should dispatch films when GET /films', async () => {
    mockAPI.onGet('/films').reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type,
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    mockAPI.onGet('/promo').reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type,
      fetchPromoFilmAction.fulfilled.type,
    ]);
  });

  it('should fetch film when GET /films/{id}', async () => {
    mockAPI.onGet('/films/1').reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmByIdAction({ filmId: '1' }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmByIdAction.pending.type,
      fetchFilmByIdAction.fulfilled.type,
    ]);
  });

  it('should fetch similar films film when GET /films/{id}/similar', async () => {
    mockAPI.onGet('/films/1/similar').reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction({ filmId: '1' }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type,
    ]);
  });

  it('should fetch similar films film when GET /comments/{id}', async () => {
    mockAPI.onGet('/comments/1').reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviews({ filmId: '1' }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchReviews.pending.type,
      fetchReviews.fulfilled.type,
    ]);
  });

  it('POST /comments/{id}', async () => {
    const postData = {
      id: '1',
      comment: 'comment',
      rating: 8,
      backToFilm: () => null,
    };

    mockAPI
      .onPost(`/comments/${postData.id}`, {
        comment: postData.comment,
        rating: postData.rating,
      })
      .reply(200);

    const store = mockStore();

    await store.dispatch(postCommentAction(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type,
    ]);
  });

  it('should fetch favorite films film when GET /favorite', async () => {
    mockAPI.onGet('/favorite').reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilms());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavoriteFilms.pending.type,
      fetchFavoriteFilms.fulfilled.type,
    ]);
  });

  it('POST /favorite/{filmId}/{status}', async () => {
    const postData = {
      status: FilmStatus.addToFavorite,
      filmId: '1',
    };

    mockAPI.onPost('/favorite/1/1').reply(200);

    const store = mockStore();

    await store.dispatch(setFavorite(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      setFavorite.pending.type,
      setFavorite.fulfilled.type,
    ]);
  });
});
