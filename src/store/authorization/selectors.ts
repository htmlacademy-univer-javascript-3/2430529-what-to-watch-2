import { ReducerName } from '../reducer';
import { State } from '../types';

export const AuthorizationSelector = {
  status: (state: State) => state[ReducerName.Authorzation].authorizationStatus,
} as const;
