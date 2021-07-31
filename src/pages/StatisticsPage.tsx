import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTopCategories, selectTopItems, getStatisticsInfo } from '../store/reducers/statisticsSlice';
import TopStatistics from '../components/TopStatistics';
import MonthlySummary from '../components/MonthlySummary';
import '../sass/StatisticsPage.scss';
import '../sass/headings.scss';

const StatisticsPage = () => {
  const topItems = useSelector(selectTopItems);
  const topCategories = useSelector(selectTopCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatisticsInfo());
  }, []);


  return (
  <div className="statistics">
    <div className="statistics__top">
      <TopStatistics title="Top Items" items={topItems} />
      <TopStatistics title="Top Categories" items={topCategories} />
    </div>
    <MonthlySummary />
  </div>
)
};

export default StatisticsPage;