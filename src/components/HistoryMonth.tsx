import React from 'react';
import { Link } from 'react-router-dom';

import CompletedDetail from './CompletedDetail';
import CalendarDetail from './CalendarDetail';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import '../sass/HistoryMonth.scss';
import '../sass/headings.scss';

// TODO updated_at to show day of the week

const HistoryMonth = ({ month, items }: { month: string; items: {id: number; updated_at: string; name: string; state: string; }[] }) => {
  return (
  <div className="history__month">
      <h4 className="subheading subheading--date">{month}</h4>
      <div className="history__items">
      {items.map(({ name, state, updated_at, id }) => 
        <div key={id} className="history__item">
            <h6 className="subheading subheading--history-item">{name}</h6>
            <div className="history__item-details">
                <CalendarDetail date={updated_at} />
                <CompletedDetail completed={state === 'completed' } />
            </div>
            <button className="btn btn--arrow"><Link to={`history/${id}`}><ArrowForwardIosIcon /></Link></button>
        </div>
      )}
      </div>
  </div>
)
};

export default HistoryMonth;