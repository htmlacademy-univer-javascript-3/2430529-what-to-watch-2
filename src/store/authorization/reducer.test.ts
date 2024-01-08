import { AuthorizationStatus } from '../../const';
import { UserData } from '../../types/user';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthorizationReducerState, authorizationReducer } from './reducer';

const mockUser: UserData = {
  email: '1@mail.ru',
  avatarUrl: 'path/path.jpg',
  name: 'Test 1',
  token: 'token',
};

describe('Authorization reducer', () => {
  let state: AuthorizationReducerState;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
  });

  it('should return default initial state', () => {
    const emptyAction = { type: '' };

    const result = authorizationReducer.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  describe('test loginAction', () => {
    it('should set authorizationStatus Auth on fulfilled', () => {
      expect(
        authorizationReducer.reducer(state, {
          type: loginAction.fulfilled.type,
          payload: mockUser,
        }).authorizationStatus
      ).toEqual(AuthorizationStatus.Auth);
    });
    it('should set user on fulfilled', () => {
      expect(
        authorizationReducer.reducer(state, {
          type: loginAction.fulfilled.type,
          payload: mockUser,
        }).user
      ).toEqual(mockUser);
    });
  });

  describe('test logoutAction', () => {
    it('should set authorizationStatus NoAuth on fulfilled', () => {
      expect(
        authorizationReducer.reducer(state, {
          type: logoutAction.fulfilled.type,
          payload: mockUser,
        }).authorizationStatus
      ).toEqual(AuthorizationStatus.NoAuth);
    });
    it('should set user null on fulfilled', () => {
      expect(
        authorizationReducer.reducer(state, {
          type: logoutAction.fulfilled.type,
          payload: mockUser,
        }).user
      ).toEqual(null);
    });
  });

  describe('test checkAuthAction', () => {
    it('should set user on fulfilled', () => {
      expect(
        authorizationReducer.reducer(state, {
          type: checkAuthAction.fulfilled.type,
          payload: mockUser,
        }).user
      ).toEqual(mockUser);
    });
    it('should set authorizationStatus Auth on fulfilled', () => {
      expect(
        authorizationReducer.reducer(state, {
          type: checkAuthAction.fulfilled.type,
          payload: mockUser,
        }).authorizationStatus
      ).toEqual(AuthorizationStatus.Auth);
    });
    it('should set authorizationStatus NoAuth on rejected', () => {
      expect(
        authorizationReducer.reducer(state, {
          type: checkAuthAction.rejected.type,
          payload: mockUser,
        }).authorizationStatus
      ).toEqual(AuthorizationStatus.NoAuth);
    });
  });
});
