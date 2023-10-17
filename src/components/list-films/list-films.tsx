import { useState } from 'react';
import { ShortFilm } from '../../types/films';
import Card from '../card/card';

type Props = {
  films: ShortFilm[];
};

export default function ListFilms({ films }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState<number>();

  const handleMouseOver = (id: number) => {
    setActiveCard(id);
  };

  return (
    <div className="catalog__films-list">
      {films.map((el) => (
        <Card key={el.id} film={el} onMouseOver={handleMouseOver} />
      ))}
    </div>
  );
}
