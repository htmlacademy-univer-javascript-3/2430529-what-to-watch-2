import MainPage from '../main-page/main-page';

type Props = {
  title: string;
  genre: string;
  year: number;
};

export default function App(props: Props) {
  return <MainPage {...props} />;
}
