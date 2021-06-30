import React from 'react';

import TopStatistics from '../components/TopStatistics';
import '../sass/StatisticsPage.scss';
import '../sass/headings.scss';

const StatisticsPage = () => {
  return (
  <div className="statistics">
    <div className="statistics__top">
      <TopStatistics title="Top Items"/>
      <TopStatistics title="Top Categories"/>
    </div>
  </div>
)
};

export default StatisticsPage;