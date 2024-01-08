import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ListFilms } from '.';

describe('Component: ListFilms', () => {
  const filmData = {
    genre: 'Drama',
    id: '12345',
    name: 'Example Movie',
    previewImage: '/path/to/preview.jpg',
    previewVideoLink: '/path/to/preview.mp4',
  };

  it('should render list film card with specified data', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <ListFilms films={[filmData]} />
      </BrowserRouter>
    );

    const filmTitle = getByText(filmData.name);
    expect(filmTitle).toBeInTheDocument();

    const filmImage = getByAltText(filmData.name);
    expect(filmImage.getAttribute('src')).toBe(filmData.previewImage);
  });
});
