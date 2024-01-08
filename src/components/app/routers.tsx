import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { PrivateRoute } from '../private-route';
import { MyListPage } from '../../pages/my-list';
import { FilmPage } from '../../pages/film';
import { MainPage } from '../../pages/main';
import { SingInPage } from '../../pages/sign-in';
import { AddReviewPage } from '../../pages/add-review';
import { PlayerPage } from '../../pages/player';
import { NotFoundPage } from '../../pages/not-found';

export const Routers = () => (
  <Routes>
    <Route path={AppRoute.Main} element={<MainPage />} />
    <Route path={AppRoute.Login} element={<SingInPage />} />
    <Route
      path={AppRoute.MyList}
      element={
        <PrivateRoute>
          <MyListPage />
        </PrivateRoute>
      }
    />
    <Route path={AppRoute.Film} element={<FilmPage />} />
    <Route
      path={AppRoute.AddReview}
      element={
        <PrivateRoute>
          <AddReviewPage />
        </PrivateRoute>
      }
    />
    <Route path={AppRoute.Player} element={<PlayerPage />} />
    <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
  </Routes>
);
