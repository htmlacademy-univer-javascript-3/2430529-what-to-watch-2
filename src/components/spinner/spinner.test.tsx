import { render, screen } from '@testing-library/react';
import { Spinner } from '.';

describe('Componen: Spinner', () => {
  it('should reder correctly', () => {
    const expectedTitle = /spinner/i;

    render(<Spinner />);

    expect(screen.getByTitle(expectedTitle)).toBeInTheDocument();
  });
});
