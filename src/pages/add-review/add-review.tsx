import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { ShortFilm } from '../../types/films';
import { AppRoute } from '../../const';
import CommentForm from '../../components/comment-form/comment-form';

type Props = {
  film: ShortFilm;
};

export default function AddReviewPage({ film }: Props) {
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.poster} alt={film.title} />
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
                  {film.title}
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

        <div className="film-card__poster film-card__poster--small">
          <img src={film.poster} alt={film.title} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <CommentForm />
      </div>
    </section>
  );
}
