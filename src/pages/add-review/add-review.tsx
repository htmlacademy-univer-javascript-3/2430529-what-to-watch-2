import { Link, Navigate, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../const';

import UserBlock from '../../components/user-block/user-block';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FilmsSelector } from '../../store/films/selector';
import { NotFoundPage } from '../not-found';
import { CommentForm } from '../../components/comment-form';

export function AddReviewPage() {
  const dispatch = useAppDispatch();

  const params = useParams();
  const filmId = params.id as string;

  useEffect(() => {
    dispatch(fetchFilmByIdAction({ filmId }));
  }, [dispatch, filmId]);

  const film = useAppSelector(FilmsSelector.film);

  if (!filmId) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return film ? (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={AppRoute.Film.replace(':id', film.id.toString())}
                  className="breadcrumbs__link"
                >
                  {film.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  to={AppRoute.AddReview.replace(':id', film.id.toString())}
                  className="breadcrumbs__link"
                >
                  Add review
                </Link>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film.posterImage}
            alt={film.name}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <CommentForm filmId={film.id} />
      </div>
    </section>
  ) : (
    <NotFoundPage />
  );
}
