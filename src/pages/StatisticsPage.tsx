import React from 'react';

import TopStatistics from '../components/TopStatistics';
import '../sass/StatisticsPage.scss';
import '../sass/headings.scss';

const StatisticsPage = () => {
  return (
  <div className="statistics">
    <div className="statistics__top">
      <TopStatistics title="Somekind of name"/>
      <TopStatistics title="Another name"/>
    </div>
  </div>
)
};

export default StatisticsPage;