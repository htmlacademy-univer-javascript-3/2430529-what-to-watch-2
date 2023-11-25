import { ShortFilm } from '../../types/films';
import { ALL_GENRES, GenresEnum } from '../../types/genres';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setGenre } from '../../store/action';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useMemo } from 'react';

type Props = {
  films: ShortFilm[];
};

const ACTIVE_CLASS = 'catalog__genres-item--active';

const getArrayOfUniqueGenres = (films: ShortFilm[]) => {
  const sets = [ALL_GENRES, ...new Set(films.map((film) => film.genre))];
  return sets.map((el, i) => ({ id: i, title: el as GenresEnum }));
};

export default function ListGenres({ films }: Props) {
  const dispatch = useDispatch();
  const storeGenre = useSelector((state: RootState) => state.genre);

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
