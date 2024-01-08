import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';

import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthorizationSelector } from '../../store/authorization/selectors';

export function UserBlock() {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(AuthorizationSelector.status);
  const user = useAppSelector(AuthorizationSelector.user);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MyList}>
            <img
              src={user?.avatarUrl}
              alt={user?.name}
              width="63"
              height="63"
            />
          </Link>
        </div>
      </li>
      <li className="user-block__item">
        <Link
          to={AppRoute.Main}
          onClick={handleLogoutClick}
          className="user-block__link"
        >
          Sign out
        </Link>
      </li>
    </ul>
  ) : (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">
        Sign in
      </Link>
    </div>
  );
}
