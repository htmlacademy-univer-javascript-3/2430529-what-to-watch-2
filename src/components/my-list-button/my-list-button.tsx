import { useCallback, useEffect, useMemo } from 'react';


import { AuthorizationSelector } from '../../store/authorization/selectors';
import { MainSelector } from '../../store/main/selector';
import { AuthorizationStatus, FilmStatus } from '../../const';
import { fetchFavoriteFilms, setFavorite } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type Props = {
  filmId: string;
};

export function MyListButton(props: Props) {
  const { filmId } = props;

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(AuthorizationSelector.status);

  const favoriteFilms = useAppSelector(MainSelector.favoriteFilms);
  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  const isFavoriteFilm = useMemo(
    () => favoriteFilms && favoriteFilms.find((film) => film.id === filmId),
    [favoriteFilms, filmId]
  );

  const favoriteCount = useAppSelector(MainSelector.favoriteCount);

  const newStatusOfFilm = isFavoriteFilm
    ? FilmStatus.deleteFromFavorite
    : FilmStatus.addToFavorite;

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoriteFilms());
    }
  }, [dispatch, isAuthorized]);

  const handleClick = useCallback(() => {
    dispatch(setFavorite({ status: newStatusOfFilm, filmId }));
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
      {favoriteFilms !== null && (
        <span className="film-card__count">{favoriteCount}</span>
      )}
    </button>
  );
}
