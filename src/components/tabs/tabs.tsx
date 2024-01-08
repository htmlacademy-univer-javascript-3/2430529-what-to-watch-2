import { useState } from 'react';
import DetailsTab from './details-tab/details-tab';
import ReviewsTab from './reviews-tab/reviews-tab';
import OverviewTab from './overview-tab/overview-tab';
import './style.css';
import { Film } from '../../types/films';
import { Review } from '../../types/review';

export enum TypeTab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

type Props = {
  film: Film;
  reviews: Review[];
};

export function Tabs({ film, reviews }: Props) {
  const [activeTab, setActiveTab] = useState(TypeTab.Overview);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(TypeTab).map((el) => (
            <li
              key={el}
              className={`film-nav__item ${
                activeTab === el ? 'film-nav__item--active' : ''
              }`}
              data-testid={`nav-btn-${el}`}
              onClick={() => setActiveTab(el)}
            >
              <a className="film-nav__link">{el}</a>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab === TypeTab.Overview && <OverviewTab film={film} />}
      {activeTab === TypeTab.Details && <DetailsTab film={film} />}
      {activeTab === TypeTab.Reviews && <ReviewsTab reviews={reviews} />}
    </div>
  );
}
