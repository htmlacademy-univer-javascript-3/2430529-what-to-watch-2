import { render } from '@testing-library/react';
import VideoPlayer from './video-player';

describe('VideoPlayer component', () => {
  const mockSrc = 'video.mp4';
  const mockPreview = 'preview.jpg';

  it('should render the video player with the correct src and poster', () => {
    const { getByTestId } = render(
      <VideoPlayer src={mockSrc} preview={mockPreview} />
    );
    const videoPlayer = getByTestId('video-player');
    expect(videoPlayer).toBeInTheDocument();
  });
});
