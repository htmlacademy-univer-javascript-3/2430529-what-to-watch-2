import { combineReducers } from '@reduxjs/toolkit';
import { filmReducer } from './films/reducer';
import { authorizationReducer } from './authorization/reducer';
import { mainReducer } from './main/reducer';

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
