import { Link } from 'react-router-dom';
import { ShortFilm } from '../../types/films';
import { AppRoute } from '../../const';
import { VideoPlayer } from '../video-player';
import { memo, useState } from 'react';
import './card.css';

type Props = {
  film: ShortFilm;
};

export const Card = memo(({ film }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link to={AppRoute.Film.replace(':id', film.id.toString())}>
        <div className="small-film-card__image">
          {isHover && (
            <VideoPlayer
              src={film.previewVideoLink}
              preview={film.previewImage}
            />
          )}
          {!isHover && <img src={film.previewImage} alt={film.name} />}
        </div>
      </Link>

      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={AppRoute.Film.replace(':id', film.id.toString())}
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
});

Card.displayName = 'Card';
