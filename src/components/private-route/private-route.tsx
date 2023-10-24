import { PropsWithChildren, ReactElement } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: ReactElement;
};

export default function PrivateRoute({
  authorizationStatus,
  children,
}: PropsWithChildren<Props>) {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
