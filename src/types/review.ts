export type Review = {
  id: number;
  user: string;
  comment: string;
  date: string;
  rating: number;
};

export type CommentForm = {
  id: string;
  comment: string;
  rating: number;
  backToFilm: () => void;
};

export interface IAddReview {
  data: Review;
  backToFilm: () => void;
}
