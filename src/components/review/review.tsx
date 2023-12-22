import { Review } from '../../types/review';

type Props = {
  review: Review;
};

export default function ReviewItem({ review }: Props) {
  const date = new Date(review.date).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>
          <time className="review__date" dateTime={review.date}>
            {date}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">
        {review.rating ? review.rating.toFixed(1) : 0}
      </div>
    </div>
  );
}
