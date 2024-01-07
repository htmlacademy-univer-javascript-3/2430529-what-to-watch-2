import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react';
import RatingInput from '../rating-input/rating-input';
import { useDispatch } from 'react-redux';
import { postCommentAction } from '../../store/api-actions';
import { AppDispatch } from '../../types/state';
import { useNavigate } from 'react-router-dom';

type Props = {
  filmId: string;
};

const MIN_CHAR_LIMIT = 50;
const MAX_CHAR_LIMIT = 400;

function isCommentFormValid(text: string, score: number) {
  return (
    text.length >= MIN_CHAR_LIMIT && text.length <= MAX_CHAR_LIMIT && score > 0
  );
}

export default function CommentForm({ filmId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const backToFilm = useCallback(
    () => navigate(`/films/${filmId}`),
    [filmId, navigate]
  );

  const [commentText, setCommentText] = useState<string>('');
  const [rating, setRating] = useState(0);

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (userRating: number) => {
    setRating(userRating);
  };

  const postComment: MouseEventHandler = (event) => {
    event.stopPropagation();
    dispatch(
      postCommentAction({
        id: filmId,
        comment: commentText,
        rating: Number(rating),
        backToFilm,
      })
    );
  };

  return (
    <form className="add-review__htmlForm">
      <RatingInput onChange={handleRatingChange} />

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          onChange={handleTextareaChange}
          minLength={MIN_CHAR_LIMIT}
          maxLength={MAX_CHAR_LIMIT}
        >
          {commentText}
        </textarea>
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            onClick={postComment}
            disabled={!isCommentFormValid(commentText, rating)}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
