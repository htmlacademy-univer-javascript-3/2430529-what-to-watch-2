import { ChangeEventHandler, useState } from 'react';
import RatingInput from '../rating-input/rating-input';

export default function CommentForm() {
  const [commentText, setCommentText] = useState<string>();
  const [, setRating] = useState(0);

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  return (
    <form action="#" className="add-review__htmlForm">
      <RatingInput onChange={handleRatingChange} />

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={handleTextareaChange}
        >
          {commentText}
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
