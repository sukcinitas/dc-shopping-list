import React from 'react';

import TopStatistics from '../components/TopStatistics';
import '../sass/ItemsPage.scss';
import '../sass/headings.scss';

const StatisticsPage = () => {
  return (
  <div className="items">
    <div className="items__header">
      <h1 className="heading"><span className="heading__detail">Shoppingify</span> allows you take your shopping list wherever you go</h1>
        <TopStatistics title="Somekind of name"/>
    </div>
  </div>
)
};

export default StatisticsPage;