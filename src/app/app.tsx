import MainPage from '../pages/main/main';

type Props = {
  title: string;
  genre: string;
  year: number;
};

export default function App(props: Props) {
  return <MainPage {...props} />;
}
