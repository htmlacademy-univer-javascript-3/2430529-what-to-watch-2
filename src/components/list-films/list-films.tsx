import { ShortFilm } from '../../types/films';
import { Card } from '../card/card';

type Props = {
  films: ShortFilm[];
};

export function ListFilms({ films }: Props) {
  return (
    <div className="catalog__films-list">
      {films.map((el) => (
        <Card key={el.id} film={el} />
      ))}
    </div>
  );
}
