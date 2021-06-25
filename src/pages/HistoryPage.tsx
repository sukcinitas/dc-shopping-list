import React from 'react';

import '../components/HistoryMonth';
import HistoryMonth from '../components/HistoryMonth';
import '../sass/HistoryPage.scss';
import '../sass/headings.scss';

const HistoryPage = () => {
  return (
  <div className="history">
    <div className="history__header">
      <h1 className="heading">Shopping history</h1>
    </div>
    <div className="history__months">
      <HistoryMonth />
    </div>
  </div>
)
};

export default HistoryPage;