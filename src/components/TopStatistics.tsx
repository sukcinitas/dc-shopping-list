import React from 'react';

import '../sass/headings.scss';
import '../sass/TopStatistics.scss';

const TopStatistics = ({ title, items }: { title: string, items?: [] }) => {
    return (<div className="top-statistics">
        <h1 className="heading">{title}</h1>
        <div className="top-statistics__items">

        </div>
        <div className="top-statistics__item">
            <h4>Name</h4>
            <span>10%</span>
            <div className="top-statistics__bar"></div>
        </div>
    </div>)
}

export default TopStatistics;