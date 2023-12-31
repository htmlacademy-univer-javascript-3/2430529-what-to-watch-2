import { ShortFilm } from '../../types/films';

import { useEffect, useMemo, useState } from 'react';
import { ALL_GENRES } from '../../types/genres';
import { PlayButton } from '../../components/play-button';
import { MyListButton } from '../../components/my-list-button';
import { Logo } from '../../components/logo';
import { UserBlock } from '../../components/user-block';
import { ListGenres } from '../../components/list-genres';
import { ListFilms } from '../../components/list-films';
import { Spinner } from '../../components/spinner';
import { ShowMore } from '../../components/show-more';
import { Footer } from '../../components/footer';
import { MainSelector } from '../../store/main/selector';
import { useAppSelector } from '../../store/hooks';

const LIMIT_FILMS = 8;

const getFilmsByGenre = (films: ShortFilm[], genre: string) =>
  genre === ALL_GENRES ? films : films.filter((film) => film.genre === genre);

export function MainPage() {
  const films = useAppSelector(MainSelector.films);
  const promoFilm = useAppSelector(MainSelector.promo);
  const currentGenre = useAppSelector(MainSelector.currentGenre);
  const isLoadingFilms = useAppSelector(MainSelector.isFilmsLoading);

  const currentFilms = useMemo(
    () => getFilmsByGenre(films, currentGenre),
    [currentGenre, films]
  );

  const [countLimit, setCountLimit] = useState(LIMIT_FILMS);

  useEffect(() => {
    setCountLimit(LIMIT_FILMS);
  }, [currentGenre]);

  const handleShowMoreButton = () => {
    setCountLimit((prev) => prev + LIMIT_FILMS);
  };

  return (
    <>
      {promoFilm && (
        <section className="film-card">
          <div className="film-card__bg">
            <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <img
                  src={promoFilm.posterImage}
                  alt={promoFilm.name}
                  width="218"
                  height="327"
                />
              </div>

              <div className="film-card__desc">
                <h2 className="film-card__title">{promoFilm.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{promoFilm.genre}</span>
                  <span className="film-card__year">{promoFilm.released}</span>
                </p>

                <div className="film-card__buttons">
                  <PlayButton filmId={promoFilm.id} />
                  <MyListButton filmId={promoFilm.id} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ListGenres films={films} />

          <ListFilms films={currentFilms.slice(0, countLimit)} />
          {isLoadingFilms && <Spinner />}

          {countLimit < currentFilms.length && (
            <ShowMore onClick={handleShowMoreButton} />
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
