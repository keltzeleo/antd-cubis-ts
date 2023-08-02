import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DraggableEvent from './DraggableEvent';

const localizer = momentLocalizer(moment);

const events = [
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
          eventWrapper: DraggableEvent,
        }}
        selectable
      />
    </DndProvider>
  );
};

export default DraggableCalendar;
