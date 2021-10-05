import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectTopCategories, selectTopItems, getStatisticsInfo, selectState, selectError } from '../store/reducers/statisticsSlice';
import TopStatistics from '../components/TopStatistics';
import MonthlySummary from '../components/MonthlySummary';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../sass/StatisticsPage.scss';
import '../sass/headings.scss';

const StatisticsPage = () => {
  const topItems = useSelector(selectTopItems);
  const topCategories = useSelector(selectTopCategories);
  const state = useSelector(selectState);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatisticsInfo());
  }, [dispatch]);

  return (
  <div className="statistics">
    {state === 'loading' ? <Loader /> : <>
    {error && <Message error>{error}</Message>}
    <div className="statistics__top">
      <TopStatistics title="Top Items" items={topItems} />
      <TopStatistics title="Top Categories" items={topCategories} />
    </div>
    <MonthlySummary />
    </>}
  </div>
)
};

export default StatisticsPage;