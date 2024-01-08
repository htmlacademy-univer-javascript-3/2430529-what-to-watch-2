import { MemoryRouter } from 'react-router-dom';
import { PlayButton } from '.';
import { render, screen } from '@testing-library/react';

describe('Component: PlayButton', () => {
  it('render play button correctly', () => {
    const expectedTitle = /Play/i;
    render(
      <MemoryRouter>
        <PlayButton filmId={'1'} />
      </MemoryRouter>
    );

    expect(screen.getByText(expectedTitle)).toBeInTheDocument();
  });
});
