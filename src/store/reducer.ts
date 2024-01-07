import { combineReducers } from '@reduxjs/toolkit';
import { filmReducer } from './film-reducer/film-reducer';
import { authorizationReducer } from './authorization-reducer/authorization-reducer';
import { mainReducer } from './main-reducer/main-reducer';

export const enum ReducerName {
  Authorzation = 'authorizationReducer',
  Main = 'mainReducer',
  Films = 'filmReducer',
}

export const reducer = combineReducers({
  [ReducerName.Films]: filmReducer.reducer,
  [ReducerName.Main]: mainReducer.reducer,
  [ReducerName.Authorzation]: authorizationReducer.reducer,
});
