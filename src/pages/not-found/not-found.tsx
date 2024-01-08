import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './style.css';

export function NotFoundPage() {
  return (
    <div className="user-page">
      <div className="page-title user-page__title" data-testid="not_found">
        <h4>Кажется такой страницы нет</h4>
        <Link to={AppRoute.Main} className="not-found-link">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
