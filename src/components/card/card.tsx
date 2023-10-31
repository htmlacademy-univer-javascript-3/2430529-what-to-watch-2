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
      }, 500);
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
              ? 'https://dev.speech-up.online/api/video/de5eda11-6391-473e-ba14-46f6372cebde'
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
