import React from 'react';
import EventNoteIcon from '@material-ui/icons/EventNote';

import '../sass/CalendarDetail.scss';

const CalendarDetail = ({ date }: { date: string}) => {
    const dateFormatted: string = date;
    return <div className="calendar-detail">
        <EventNoteIcon />
        <span>{dateFormatted}</span>
    </div>
}

export default CalendarDetail;