import { useSelector } from 'react-redux';
import Footer from '../../components/footer/footer';
import ListFilms from '../../components/list-films/list-films';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { RootState } from '../../store';
import { ReducerName } from '../../store/reducer';

export function MyListPage() {
  const films = useSelector(
    (state: RootState) => state[ReducerName.Main].favoriteFilms
  );

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{films.length}</span>
        </h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <ListFilms films={films} />
      </section>

      <Footer />
    </div>
  );
}
