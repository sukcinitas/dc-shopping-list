import React from 'react';
import EventNoteIcon from '@material-ui/icons/EventNote';

import '../sass/CalendarDetail.scss';

const CalendarDetail = ({ date }: { date: string}) => {
    const dayMap = ['Sun', 'Mon', 'Tuey', 'Wen', 'Thu', 'Fri', 'Sat'];

    return <div className="calendar-detail">
        <EventNoteIcon />
        <span>{`${dayMap[(new Date(date)).getDay()]} ${date}` }</span>
    </div>
}

export default CalendarDetail;