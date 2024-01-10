import { Link, Navigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useEffect } from 'react';
import {
  fetchFilmByIdAction,
  fetchReviews,
  fetchSimilarFilmsAction,
} from '../../store/api-actions';
import { NotFoundPage } from '../not-found';
import { PlayButton } from '../../components/play-button';
import { MyListButton } from '../../components/my-list-button';
import { Spinner } from '../../components/spinner';
import { Logo } from '../../components/logo';
import { UserBlock } from '../../components/user-block';
import { Tabs } from '../../components/tabs';
import { ListFilms } from '../../components/list-films';
import { Footer } from '../../components/footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FilmsSelector } from '../../store/films/selector';
import { AuthorizationSelector } from '../../store/authorization/selectors';

const LIMIT_SIMILAR_FILMS = 4;

export function FilmPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(AuthorizationSelector.status);

  const film = useAppSelector(FilmsSelector.film);
  const isLoadingFilm = useAppSelector(FilmsSelector.isLoadingFilm);

  const reviews = useAppSelector(FilmsSelector.reviews);
  const similarFilms = useAppSelector(FilmsSelector.similarFilms).slice(
    0,
    LIMIT_SIMILAR_FILMS
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
                <PlayButton filmId={film.id} />
                <MyListButton filmId={film.id} />

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
