import { Film } from '../../../types/films';

type Props = {
  film: Film;
};

export default function OverviewTab({ film }: Props) {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {film.description.split('.').map((str) => (
          <p key={str.length}>{str}</p>
        ))}

        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring:{' '}
            {film.starring.length > 3
              ? `${film.starring.slice(0,3).join(', ')} and other`
              : film.starring.join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
}
