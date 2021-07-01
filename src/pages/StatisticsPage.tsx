import React from 'react';

import TopStatistics from '../components/TopStatistics';
import MonthlySummary from '../components/MonthlySummary';
import '../sass/StatisticsPage.scss';
import '../sass/headings.scss';

const StatisticsPage = () => {
  return (
  <div className="statistics">
    <div className="statistics__top">
      <TopStatistics title="Top Items"/>
      <TopStatistics title="Top Categories"/>
    </div>
    <MonthlySummary />
  </div>
)
};

export default StatisticsPage;