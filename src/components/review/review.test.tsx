import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReviewItem } from '.';
import reviews from '../../mocks/reviews';

describe('Component: ReviewItem', () => {
  const reviewData = reviews[0];

  it('should render film card with specified data', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ReviewItem review={reviewData} />
      </BrowserRouter>
    );

    const userTitle = getByText(reviewData.user);
    expect(userTitle).toBeInTheDocument();

    const commentText = getByText(reviewData.comment);
    expect(commentText).toBeInTheDocument();
  });
});
