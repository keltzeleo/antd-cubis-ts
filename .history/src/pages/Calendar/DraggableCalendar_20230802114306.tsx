import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'antd/dist/antd.css';
import EventWrapper from './EventWrapper';

const localizer = momentLocalizer(moment);

interface MyEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
  }
  
  const events: MyEvent[] = [
    { id: 1, title: 'Task 1', start: new Date(2023, 7, 2, 9, 0), end: new Date(2023, 7, 2, 10, 0) },
    { id: 2, title: 'Task 2', start: new Date(2023, 7, 3, 11, 0), end: new Date(2023, 7, 3, 12, 0) },
    // Add more events here...
  ];

const DraggableCalendar: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Calendar
        localizer={localizer}
        events={events}
        components={{
          eventWrapper: EventWrapper,
        }}
        selectable
      />
    </DndProvider>
  );
};

export default DraggableCalendar;
