import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main/main';
import { AppRoute, AuthorizationStatus } from '../../const';
import SingInPage from '../../pages/sign-in/sign-in';
import MyListPage from '../../pages/my-list/my-list';
import FilmPage from '../../pages/film/film';
import AddReviewPage from '../../pages/add-review/add-review';
import PlayerPage from '../../pages/player/player';
import NotFoundPage from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type Props = {
  title: string;
  genre: string;
  year: number;
};

export default function App(props: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage {...props} />} />
        <Route path={AppRoute.Login} element={<SingInPage />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<FilmPage />} />
        <Route path={AppRoute.AddReview} element={<AddReviewPage />} />
        <Route path={AppRoute.Player} element={<PlayerPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
