import { PropsWithChildren, ReactElement } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { AuthorizationSelector } from '../../store/authorization/selectors';

type Props = {
  children: ReactElement;
};

export function PrivateRoute({ children }: PropsWithChildren<Props>) {
  const authorizationStatus = useAppSelector(AuthorizationSelector.status);
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
