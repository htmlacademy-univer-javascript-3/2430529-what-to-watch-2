import { ShortFilm } from '../../types/films';
import { ALL_GENRES, GenresEnum } from '../../types/genres';
import { setGenre } from '../../store/action';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MainSelector } from '../../store/main/selector';

type Props = {
  films: ShortFilm[];
};

const ACTIVE_CLASS = 'catalog__genres-item--active';
const LIMIT_GENRES = 9;

const getArrayOfUniqueGenres = (films: ShortFilm[]) => {
  const sets = [ALL_GENRES, ...new Set(films.map((film) => film.genre))].slice(
    0,
    LIMIT_GENRES
  );
  return sets.map((el, i) => ({ id: i, title: el as GenresEnum }));
};

export function ListGenres({ films }: Props) {
  const dispatch = useAppDispatch();
  const storeGenre = useAppSelector(MainSelector.currentGenre);

  const genres = useMemo(() => getArrayOfUniqueGenres(films), [films]);

  const handleClick = (genre: string) => {
    dispatch(setGenre(genre));
  };

  return (
    <div>
      <ul className="catalog__genres-list">
        {genres.map((genre) => (
          <li
            key={genre.id}
            className={`catalog__genres-item ${
              genre.title === storeGenre ? ACTIVE_CLASS : ''
            }`}
            onClick={() => handleClick(genre.title)}
          >
            <a className="catalog__genres-link">{genre.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
