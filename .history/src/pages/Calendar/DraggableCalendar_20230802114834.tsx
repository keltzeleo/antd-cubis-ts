import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DraggableEvent from './DraggableEvent';

const localizer = momentLocalizer(moment);

type MyEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

const events: MyEvent[] = [
  {
    id: 1,
    title: 'Event 1',
    start: new Date(),
    end: new Date(),
  },
  // Add more events as needed
];

const DraggableCalendar: React.FC = () => {
  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        components={{
          eventWrapper: DraggableEvent,
        }}
        selectable
      />
    </div>
  );
};

export default DraggableCalendar;
