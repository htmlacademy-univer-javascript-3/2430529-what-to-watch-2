import { Review } from '../../types/review';

type Props = {
  review: Review;
};

export default function ReviewItem({ review }: Props) {
  const date = new Date(review.date).toLocaleDateString();
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.description}</p>

        <footer className="review__details">
          <cite className="review__author">{review.name}</cite>
          <time className="review__date" dateTime={review.date}>
            {date}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.score}</div>
    </div>
  );
}
