import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  preview: string;
};

const TIME_LIMIT = 1000;

export function VideoPlayer({ src, preview }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, TIME_LIMIT);
  }, []);

  return (
    <video
      data-testid="video-player"
      ref={videoRef}
      src={src}
      poster={preview}
      className="player__video"
      loop
      muted
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
