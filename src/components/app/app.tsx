import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';

import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ReducerName } from '../../store/reducer';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { MainPage } from '../../pages/main';
import { SingInPage } from '../../pages/sign-in';
import { MyListPage } from '../../pages/my-list';
import { FilmPage } from '../../pages/film';
import { AddReviewPage } from '../../pages/add-review';
import { PlayerPage } from '../../pages/player';
import { NotFoundPage } from '../../pages/not-found';
import { PrivateRoute } from '../private-route';
import { ScrollToTop } from '../scroll-to-top';

export default function App() {
  const error = useSelector(
    (state: RootState) => state[ReducerName.Main].error
  );

  useEffect(() => {
    toast(error);
  }, [error]);

  return (
    <BrowserRouter>
      <ScrollToTop />
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
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}
