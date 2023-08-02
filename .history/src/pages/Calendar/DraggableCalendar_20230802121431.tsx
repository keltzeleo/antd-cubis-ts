import React, { ComponentType } from 'react';
import { Calendar, CalendarProps } from 'react-big-calendar'; // Import CalendarProps from 'react-big-calendar'
import DraggableEvent from './DraggableEvent';
import { MyEvent } from './MyEvent';

const DraggableCalendar: React.FC<CalendarProps<MyEvent, object>> = ({ events }) => {
  return (
    <Calendar
      events={events}
      components={{
        eventWrapper: DraggableEvent as ComponentType<EventWrapperProps<MyEvent>>, // Explicitly cast to ComponentType
      }}
      selectable
    />
  );
};

export default DraggableCalendar;
