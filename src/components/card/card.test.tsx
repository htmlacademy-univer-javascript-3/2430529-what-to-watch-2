import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Card } from '.';

describe('FilmCard component', () => {
  const filmData = {
    genre: 'Drama',
    id: '12345',
    name: 'Example Movie',
    previewImage: '/path/to/preview.jpg',
    previewVideoLink: '/path/to/preview.mp4',
  };

  it('should render film card with specified data', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Card film={filmData} />
      </BrowserRouter>
    );

    const filmTitle = getByText(filmData.name);
    expect(filmTitle).toBeInTheDocument();

    const filmImage = getByAltText(filmData.name);
    expect(filmImage.getAttribute('src')).toBe(filmData.previewImage);
  });
});
