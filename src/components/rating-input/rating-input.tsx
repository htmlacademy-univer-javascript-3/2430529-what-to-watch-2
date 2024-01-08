import { Fragment } from 'react';

type Props = {
  onChange: (value: number) => void;
};

const ratingStars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse();

export function RatingInput({ onChange }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(Number(e.target.value));
    }
  };

  return (
    <div className="rating">
      <div className="rating__stars">
        {ratingStars.map((rating) => (
          <Fragment key={`star-rating-${rating}`}>
            <input
              className="rating__input"
              id={`star-${rating}`}
              type="radio"
              name="rating"
              value={`${rating}`}
              onChange={handleInputChange}
            />
            <label className="rating__label" htmlFor={`star-${rating}`}>
              Rating {rating}
            </label>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
