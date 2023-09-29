import { Link } from 'react-router-dom';
import './style.css';
import { AppRoute } from '../../const';

export default function NotFoundPage() {
  return (
    <div className="user-page">
      <div className="page-title user-page__title">
        <h4>Кажется такой страницы нет</h4>
        <Link to={AppRoute.Main} className='not-found-link'>Вернуться на главную</Link>
      </div>
    </div>
  );
}
