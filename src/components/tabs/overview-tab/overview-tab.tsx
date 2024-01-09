import { Film } from '../../../types/films';

type Props = {
  film: Film;
};

export enum StatusRating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

function getRatingDescription(rating: number): StatusRating {
  if (rating < 3) {
    return StatusRating.Bad;
  } else if (rating >= 3 && rating < 5) {
    return StatusRating.Normal;
  } else if (rating >= 5 && rating < 8) {
    return StatusRating.Good;
  } else if (rating >= 8 && rating < 10) {
    return StatusRating.VeryGood;
  } else {
    return StatusRating.Awesome;
  }
}

export default function OverviewTab({ film }: Props) {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">
            {getRatingDescription(film.rating)}
          </span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
            Starring:{' '}
            {film.starring.length > 3
              ? `${film.starring.slice(0, 3).join(', ')} and other`
              : film.starring.join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
}
