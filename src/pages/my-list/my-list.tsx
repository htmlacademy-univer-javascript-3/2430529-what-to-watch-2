import { useEffect } from 'react';

import { fetchFavoriteFilms } from '../../store/api-actions';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { MainSelector } from '../../store/main/selector';
import { Logo } from '../../components/logo';
import { UserBlock } from '../../components/user-block';
import { ListFilms } from '../../components/list-films';
import { Footer } from '../../components/footer';

export function MyListPage() {
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
          My list{' '}
          <span className="user-page__film-count">{favoriteFilms.length}</span>
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
