import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  dark?: boolean;
};

export default function Logo({ dark }: Props) {
  return (
    <div className="logo">
      <Link
        className={`logo__link ${dark ? 'logo__link--light' : ''}`}
        to={AppRoute.Main}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
