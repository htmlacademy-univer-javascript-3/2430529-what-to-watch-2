import { Link } from 'react-router-dom';
import { ShortFilm } from '../../types/films';
import { AppRoute } from '../../const';
import VideoPlayer from '../video-player/video-player';
import { useEffect, useState } from 'react';

type Props = {
  film: ShortFilm;
};

export const Card = ({ film }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    if (isHover) {
      const timer = setTimeout(() => {
        setIsPlay(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isHover]);

  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
    setIsPlay(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          videoLink={
            isPlay
              ? 'https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm'
              : ''
          }
          poster={film.posterImage}
        />
      </div>
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
};
