import { ReducerName } from '../reducer';
import { State } from '../types';

export const AuthorizationSelector = {
  status: (state: State) => state[ReducerName.Authorzation].authorizationStatus,
  user: (state: State) => state[ReducerName.Authorzation].user,
} as const;
