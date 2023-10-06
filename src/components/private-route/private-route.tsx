import { PropsWithChildren } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type Props = {
  authorizationStatus: AuthorizationStatus;
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
