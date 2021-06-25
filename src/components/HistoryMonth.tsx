import React from 'react';

import CompletedDetail from './CompletedDetail';
import CalendarDetail from './CalendarDetail';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import '../sass/HistoryMonth.scss';
import '../sass/headings.scss';

const HistoryMonth = () => {
  return (
  <div className="history__month">
      <h4 className="subheading subheading--date">Month</h4>
      <div className="history__items">
        <div className="history__item">
            <h6 className="subheading subheading--history-item">Name</h6>
            <div className="history__item-details">
                <CalendarDetail date="Mon 2012-04-08" />
                <CompletedDetail completed />
                <button className="btn btn--arrow"><ArrowForwardIosIcon /></button>
            </div>
        </div>
      </div>
  </div>
)
};

export default HistoryMonth;