import { useSelector } from 'react-redux';
import Footer from '../../components/footer/footer';
import ListFilms from '../../components/list-films/list-films';
import ListGenres from '../../components/list-genres/list-genres';
import Logo from '../../components/logo/logo';
import { ShortFilm, Film } from '../../types/films';
import { RootState } from '../../store';
import { useEffect, useMemo, useState } from 'react';
import { ALL_GENRES } from '../../types/genres';
import ShowMore from '../../components/show-more/show-more';

type Props = {
  promoFilm: Film;
  films: ShortFilm[];
};

const LIMIT_FILMS = 8;

const getFilmsByGenre = (films: ShortFilm[], genre: string) =>
  genre === ALL_GENRES ? films : films.filter((film) => film.genre === genre);

export default function MainPage({ promoFilm, films }: Props) {
  const currentGenre = useSelector((state: RootState) => state.genre);

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
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.posterImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm.posterImage}
                alt="The Grand Budapest Hotel poster"
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
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ListGenres films={films} />

          <ListFilms films={currentFilms.slice(0, countLimit)} />

          {countLimit < currentFilms.length && (
            <ShowMore onClick={handleShowMoreButton} />
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
