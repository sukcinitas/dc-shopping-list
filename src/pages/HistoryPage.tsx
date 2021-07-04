import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectListsByDate,
} from '../store/reducers/historySlice';
import '../components/HistoryMonth';
import HistoryMonth from '../components/HistoryMonth';
import '../sass/HistoryPage.scss';
import '../sass/headings.scss';

const HistoryPage = () => {
  const lists = useSelector(selectListsByDate);

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