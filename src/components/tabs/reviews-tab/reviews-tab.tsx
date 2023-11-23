import { Review } from '../../../types/review';
import ReviewItem from '../../review/review';

type Props = {
  reviews: Review[];
};

export default function ReviewsTab({ reviews }: Props) {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(0, Math.floor(reviews.length / 2)).map((el) => (
          <ReviewItem key={el.id} review={el} />
        ))}
      </div>

      <div className="film-card__reviews-col">
        {reviews.slice(Math.floor(reviews.length / 2)).map((el) => (
          <ReviewItem key={el.id} review={el} />
        ))}
      </div>
    </div>
  );
}
