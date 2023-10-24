export type ShortFilm = {
  id: number;
  name: string;
  posterImage: string;
  previewImage?: string;
};

export type Film = ShortFilm & {
  backgroundImage: string;
  videoLink: string;
  description: string;
  rating: number;
  genre: string;
  scoresCount: number;
  director: string;
  starring: string[];
  released: number;
  isFavorite: boolean;
};
