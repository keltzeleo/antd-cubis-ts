import React from 'react';
import { Calendar } from 'antd';

const events = [
  {
    title: 'Event 1',
    start: new Date(2023, 7, 1),
    end: new Date(2023, 7, 2),
  },
  {
    title: 'Event 2',
    start: new Date(2023, 7, 3),
    end: new Date(2023, 7, 4),
  },
];

const DraggableCalendar = () => {
  const [state, setState] = React.useState({
    events,
    currentEvent: null,
  });

  const onEventDragStart = (event) => {
    setState({ ...state, currentEvent: event });
  };

  const onEventDragOver = (event) => {
    event.preventDefault();
  };

  const onEventDrop = (event) => {
    const { events, currentEvent } = state;
    const newEvents = events.filter((e) => e.title !== currentEvent.title);
    currentEvent.start = event.date;
    currentEvent.end = event.date;
    newEvents.push(currentEvent);
    setState({ ...state, events: newEvents });
  };

  return (
    <Calendar
      onDragStart={onEventDragStart}
      onDragOver={onEventDragOver}
      onDrop={onEventDrop}
      events={state.events}
    />
  );
};

export default DraggableCalendar;
