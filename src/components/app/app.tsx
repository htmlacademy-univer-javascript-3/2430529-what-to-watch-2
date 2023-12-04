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
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { promoFilm } from '../../mocks/films';

export default function App() {
  const films = useSelector((state: RootState) => state.films);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage films={films} promoFilm={promoFilm} />}
        />
        <Route path={AppRoute.Login} element={<SingInPage />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListPage films={films} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<FilmPage film={promoFilm} likeThis={films} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage film={promoFilm} />}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerPage film={promoFilm} />}
        />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
