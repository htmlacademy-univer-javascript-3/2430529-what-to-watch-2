import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('should render the button with given children and className', () => {
    const children = 'Click me';
    const className = 'custom-button';
    const handleClick = () => {
      Promise.resolve();
    };

    const { getByText } = render(
      <Button className={className} onClick={handleClick}>
        {children}
      </Button>
    );

    const button = getByText(children);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('film-card__button');
    expect(button).toHaveClass(className);
  });
});
