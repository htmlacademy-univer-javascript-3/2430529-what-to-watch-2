import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../types/state';
import { logoutAction } from '../../store/api-actions';

export default function UserBlock() {
  const dispatch = useDispatch<AppDispatch>();

  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );
  const user = useSelector((state: RootState) => state.user);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={user?.avatarUrl} alt={user?.name} width="63" height="63" />
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
