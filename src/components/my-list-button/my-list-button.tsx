import { useCallback, useMemo } from 'react';

import { AuthorizationSelector } from '../../store/authorization/selectors';
import { MainSelector } from '../../store/main/selector';
import { AppRoute, AuthorizationStatus, FilmStatus } from '../../const';
import { fetchFavoriteFilms, setFavorite } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

type Props = {
  filmId: string;
};

export function MyListButton(props: Props) {
  const { filmId } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(AuthorizationSelector.status);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const favoriteFilms = useAppSelector(MainSelector.favoriteFilms);

  const isFavoriteFilm = useMemo(
    () => !!favoriteFilms.find((film) => film.id === filmId),
    [favoriteFilms, filmId]
  );

  const favoriteCount = useAppSelector(MainSelector.favoriteCount);

  const newStatusOfFilm = isFavoriteFilm
    ? FilmStatus.deleteFromFavorite
    : FilmStatus.addToFavorite;

  const handleClick = useCallback(() => {
    if (!isAuthorized) {
      navigate(AppRoute.Login);
    } else {
      dispatch(setFavorite({ status: newStatusOfFilm, filmId }));
      dispatch(fetchFavoriteFilms());
    }
  }, [isAuthorized, dispatch, newStatusOfFilm, filmId, navigate]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleClick}
    >
      {isFavoriteFilm ? (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={'#in-list'}></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={'#add'}></use>
        </svg>
      )}
      <span>My list</span>
      <span className="film-card__count">{favoriteCount}</span>
    </button>
  );
}
