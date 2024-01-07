import { PropsWithChildren, ReactElement } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ReducerName } from '../../store/reducer';

type Props = {
  children: ReactElement;
};

export default function PrivateRoute({ children }: PropsWithChildren<Props>) {
  const authorizationStatus = useSelector(
    (state: RootState) => state[ReducerName.Authorzation].authorizationStatus
  );
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
