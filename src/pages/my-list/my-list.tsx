import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import ListFilms from '../../components/list-films/list-films';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { fetchFavoriteFilms } from '../../store/api-actions';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MainSelector } from '../../store/main/selector';

export function MyListPage() {
  const favoriteCount = useAppSelector(MainSelector.favoriteCount);
  const favoriteFilms = useAppSelector(MainSelector.favoriteFilms);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{favoriteCount}</span>
        </h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ListFilms films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
}
