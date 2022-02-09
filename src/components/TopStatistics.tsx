import React from 'react';

import '../sass/headings.scss';
import '../sass/TopStatistics.scss';

const TopStatistics = ({
  title,
  items,
}: {
  title: string;
  items?: { name: string; percent: number }[];
}) => {
  if (!items) return <h1></h1>;
  return (
    <div className="top-statistics">
      <h1 className="heading">{title}</h1>
      <div className="top-statistics__items">
        {items.map(({ name, percent }) => (
          <div key={name} className="top-statistics__item">
            <div className="top-statistics__details">
              <h4 className="subheading subheading--top">{name}</h4>
              <span className="subheading subheading--top-percent">{`${percent} %`}</span>
            </div>
            <span className="top-statistics__bar">
              <span
                className={
                  title === 'Top Categories'
                    ? 'top-statistics__bar--percent-blue'
                    : 'top-statistics__bar--percent'
                }
                style={{ width: `${percent}%` }}
              ></span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStatistics;
