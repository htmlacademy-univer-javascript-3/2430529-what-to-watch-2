type Props = {
  videoLink: string;
  poster: string;
};

export default function VideoPlayer(props: Props) {
  return (
    <video
      src={props.videoLink}
      poster={props.poster}
      width="280"
      height="175"
      muted
      autoPlay
    />
  );
}
