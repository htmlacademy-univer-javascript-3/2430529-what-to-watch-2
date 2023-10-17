import { Link } from 'react-router-dom';
import { ShortFilm } from '../../types/films';
import { AppRoute } from '../../const';

type Props = {
  film: ShortFilm;
  onMouseOver: (id: number) => void;
};

export default function Card({ film, onMouseOver }: Props) {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => onMouseOver(film.id)}
    >
      <div className="small-film-card__image">
        <img src={film.poster} alt={film.title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={AppRoute.Film.replace(':id', film.id.toString())}
        >
          {film.title}
        </Link>
      </h3>
    </article>
  );
}
