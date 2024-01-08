import { render } from '@testing-library/react';
import { MyListButton } from '.';

describe('Button component', () => {
  it('should render the button with given children and className', () => {
    const children = 'Click me';
    const className = 'custom-button';

    const { getByText } = render(<MyListButton filmId={'2'}></MyListButton>);

    const button = getByText(children);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('film-card__button');
    expect(button).toHaveClass(className);
  });
});
