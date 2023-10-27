type Props = {
  onChange: (value: number) => void;
};

const ratingStar = [...Array(10).keys()].reverse();

export default function RatingInput({ onChange }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onChange(Number(e.target.value));
    }
  };

  return (
    <div className="rating">
      <div className="rating__stars">
        {ratingStar.map((rating) => (
          <>
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
          </>
        ))}
      </div>
    </div>
  );
}
