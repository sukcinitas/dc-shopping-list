import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectListsByDate, getLists
} from '../store/reducers/historySlice';
import '../components/HistoryMonth';
import HistoryMonth from '../components/HistoryMonth';
import '../sass/HistoryPage.scss';
import '../sass/headings.scss';

const HistoryPage = () => {
  const lists = useSelector(selectListsByDate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLists());
  }, []);

  return (
  <div className="history">
    <div className="history__header">
      <h1 className="heading">Shopping history</h1>
    </div>
    <div className="history__months">
      {Object.keys(lists).map((month) => <HistoryMonth key={month} month={month} items={lists[month]} />)}
    </div>
  </div>
)
};

export default HistoryPage;