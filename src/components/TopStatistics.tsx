import React from 'react';

import '../sass/headings.scss';
import '../sass/TopStatistics.scss';

const TopStatistics = ({ title, items = [{ name: 'Banana', percent: 14 },{ name: 'Beef', percent: 40 },{ name: 'Beer', percent: 27 }]}: { title: string, items?: {name: string; percent: number}[] }) => {
    return (<div className="top-statistics">
        <h1 className="heading">{title}</h1>
        <div className="top-statistics__items">
            {items.map(({ name, percent }) => <div key={name} className="top-statistics__item">
                <div className="top-statistics__details">
                    <h4 className="subheading subheading--top">{name}</h4>
                    <span className="subheading subheading--top-percent">{`${percent} %`}</span>
                </div>
                <span className="top-statistics__bar"><span className="top-statistics__bar--percent" style={{width: `${percent}%`}}></span></span>
            </div>)}
        </div>
    </div>)
}

export default TopStatistics;