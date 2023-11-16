import { useState } from 'react';
import DetailsTab from './details-tab';
import ReviewsTab from './reviews-tab';
import OverviewTab from './overview-tab';

enum TypeTab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export default function Tabs() {
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
              onClick={() => setActiveTab(el)}
            >
              <a className="film-nav__link">{el}</a>
            </li>
          ))}
        </ul>
      </nav>

      {activeTab === TypeTab.Details && <DetailsTab />}
      {activeTab === TypeTab.Reviews && <ReviewsTab />}
      {activeTab === TypeTab.Overview && <OverviewTab />}
    </div>
  );
}
