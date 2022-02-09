import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectListsByDate,
  getLists,
  selectState,
  selectError,
} from '../store/reducers/historySlice';
import '../components/HistoryMonth';
import HistoryMonth from '../components/HistoryMonth';
import Loader from '../components/Loader';
import Message from '../components/Message';
import '../sass/HistoryPage.scss';
import '../sass/headings.scss';

const HistoryPage = () => {
  const lists = useSelector(selectListsByDate);
  const dispatch = useDispatch();
  const state = useSelector(selectState);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  return (
    <div className="history">
      {error && <Message error>{error}</Message>}
      <div className="history__header">
        <h1 className="heading">Shopping history</h1>
      </div>
      {state === 'loading' ? (
        <Loader />
      ) : (
        <>
          <div className="history__months">
            {Object.keys(lists).map((month) => (
              <HistoryMonth key={month} month={month} items={lists[month]} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
