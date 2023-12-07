import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Link } from 'react-router-dom';

export default function UserBlock() {
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );
  return authorizationStatus === AuthorizationStatus.Auth ? (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link">Sign out</a>
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
