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
import Spinner from '../spinner/spinner';

export default function App() {
  const films = useSelector((state: RootState) => state.films);
  const promo = useSelector((state: RootState) => state.promoFilm);
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  const isLoading = useSelector((state: RootState) => state.isLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage films={films} promoFilm={promo!} />}
        />
        <Route path={AppRoute.Login} element={<SingInPage />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage films={films} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<FilmPage />} />
        <Route path={AppRoute.AddReview} element={<AddReviewPage />} />
        <Route path={AppRoute.Player} element={<PlayerPage film={promo!} />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
