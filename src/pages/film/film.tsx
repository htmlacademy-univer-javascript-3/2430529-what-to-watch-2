import { Link, Navigate, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoute, AuthorizationStatus } from '../../const';

import ListFilms from '../../components/list-films/list-films';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/tabs';

import UserBlock from '../../components/user-block/user-block';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { RootState } from '../../store';
import {
  fetchFilmByIdAction,
  fetchReviews,
  fetchSimilarFilmsAction,
} from '../../store/api-actions';
import { AppDispatch } from '../../types/state';
import Spinner from '../../components/spinner/spinner';

import { ReducerName } from '../../store/reducer';
import NotFoundPage from '../not-found/not-found';

export default function FilmPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const authorizationStatus = useSelector(
    (state: RootState) => state[ReducerName.Authorzation].authorizationStatus
  );

  const film = useSelector((state: RootState) => state[ReducerName.Films].film);
  const isLoadingFilm = useSelector(
    (state: RootState) => state[ReducerName.Films].isLoading
  );

  const reviews = useSelector(
    (state: RootState) => state[ReducerName.Films].reviews
  );
  const similarFilms = useSelector(
    (state: RootState) => state[ReducerName.Films].similarFilms
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction({ filmId: id }));
      dispatch(fetchSimilarFilmsAction({ filmId: id }));
      dispatch(fetchReviews({ filmId: id }));
    }
  }, [id]);

  if (isLoadingFilm) {
    return <Spinner />;
  }

  if (!id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return film ? (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link
                  className="btn btn--play film-card__button"
                  to={AppRoute.Player.replace(':id', film.id)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>

                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link
                    className="btn film-card__button"
                    to={AppRoute.AddReview.replace(':id', film.id)}
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>
            <Tabs film={film} reviews={reviews} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          {similarFilms && <ListFilms films={similarFilms} />}
        </section>

        <Footer />
      </div>
    </>
  ) : (
    <NotFoundPage />
  );
}
