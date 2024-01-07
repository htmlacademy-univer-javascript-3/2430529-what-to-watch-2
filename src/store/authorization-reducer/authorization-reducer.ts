import { createSlice } from '@reduxjs/toolkit';
import { UserData } from '../../types/user';
import { AuthorizationStatus } from '../../const';
import { ReducerName } from '../reducer';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { dropToken, saveToken } from '../../services/token';

export interface AuthorizationReducerState {
  user: UserData | null;
  authorizationStatus: string;
}

const initialState: AuthorizationReducerState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const authorizationReducer = createSlice({
  name: ReducerName.Authorzation,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.fulfilled, (state) => {
        dropToken();
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        saveToken(action.payload.token);
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
