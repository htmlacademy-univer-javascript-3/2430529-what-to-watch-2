export type ShortFilm = {
  id: number;
  title: string;
  poster: string;
  background: string;
  videoLink: string;
  genre: string;
  year: number;
};

export type DetailFilm = {
  description: string;
  rating: number;
  ratingCount: number;
  director: string;
  starring: string[];
  isFavorite: boolean;
};

export type WholeFilm = ShortFilm & DetailFilm;
