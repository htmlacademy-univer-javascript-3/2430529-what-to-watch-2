import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  dark?: boolean;
};

export function Logo({ dark }: Props) {
  return (
    <div className="logo">
      <Link
        data-testid="logo-link"
        className={`logo__link ${dark ? 'logo__link--light' : ''}`}
        to={AppRoute.Main}
      >
        <span
          data-testid="logo-letter"
          className="logo__letter logo__letter--1"
        >
          W
        </span>
        <span
          data-testid="logo-letter"
          className="logo__letter logo__letter--2"
        >
          T
        </span>
        <span
          data-testid="logo-letter"
          className="logo__letter logo__letter--3"
        >
          W
        </span>
      </Link>
    </div>
  );
}
