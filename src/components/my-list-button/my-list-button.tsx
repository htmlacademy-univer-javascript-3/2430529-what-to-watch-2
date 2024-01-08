import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthorizationSelector } from '../../store/authorization/selectors';
import { MainSelector } from '../../store/main/selector';
import { AuthorizationStatus, FilmStatus } from '../../const';
import { fetchFavoriteFilms, setFavorite } from '../../store/api-actions';

type Props = {
  filmId: string;
};

export function MyListButton(props: Props) {
  const { filmId } = props;

  const authorizationStatus = useAppSelector(AuthorizationSelector.status);

  const favoriteFilms = useAppSelector(MainSelector.favoriteFilms);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const isFavoriteFilm = favoriteFilms?.find((film) => film.id === filmId);

  const favoriteCount = useAppSelector(MainSelector.favoriteCount);

  const newStatusOfFilm = isFavoriteFilm
    ? FilmStatus.deleteFromFavorite
    : FilmStatus.addToFavorite;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [dispatch, isAuthorized]);

  const handleClick = useCallback(() => {
    dispatch(setFavorite({ status: Boolean(newStatusOfFilm), filmId }));
  }, [dispatch, newStatusOfFilm, filmId]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavoriteFilm ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      {favoriteFilms !== null && (
        <span className="film-card__count">{favoriteCount}</span>
      )}
    </button>
  );
}
