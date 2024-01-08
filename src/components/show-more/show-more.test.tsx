import { render, screen } from '@testing-library/react';
import { ShowMore } from '.';

describe('Component: ShowMore', () => {
  it('render correctly', () => {
    const expectedText = 'Show more';
    render(<ShowMore onClick={() => undefined} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
