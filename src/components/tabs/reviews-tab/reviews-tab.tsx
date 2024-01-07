import { Review } from '../../../types/review';
import ReviewItem from '../../review/review';

type Props = {
  reviews: Review[];
};

export default function ReviewsTab({ reviews }: Props) {
  return (
    <div className="film-card__reviews film-card__row">
      {reviews.length === 1 && (
        <div className="film-card__reviews-col">
          {reviews.map((el) => (
            <ReviewItem key={el.id} review={el} />
          ))}
        </div>
      )}
      {reviews.length > 1 && (
        <>
          <div className="film-card__reviews-col">
            {reviews.slice(0, Math.ceil(reviews.length / 2)).map((el) => (
              <ReviewItem key={el.id} review={el} />
            ))}
          </div>

          <div className="film-card__reviews-col">
            {reviews.slice(Math.ceil(reviews.length / 2)).map((el) => (
              <ReviewItem key={el.id} review={el} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
