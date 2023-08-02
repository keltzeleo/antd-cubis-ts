import React from 'react';
import { Calendar } from 'antd';
import moment from 'moment';

interface Event {
  id: number;
  title: string;
  start: moment.Moment;
  end: moment.Moment;
}

const DraggableCalendar = () => {
  const [events, setEvents] = React.useState<Event[]>([
    {
      id: 1,
      title: 'Event 1',
      start: moment('2023-08-01T10:00:00'),
      end: moment('2023-08-01T12:00:00'),
    },
    {
      id: 2,
      title: 'Event 2',
      start: moment('2023-08-02T10:00:00'),
      end: moment('2023-08-02T12:00:00'),
    },
  ]);

  const handleDrop = (info) => {
    const { event, start } = info;
    const updatedEvents = events.map((item) =>
      item.id === event.id ? { ...item, start } : item
    );
    setEvents(updatedEvents);
  };

  return (
    <Calendar
      onDrop={handleDrop}
      dateCellRender={(date) => {
        const filteredEvents = events.filter(
          (event) =>
            date.isSame(event.start, 'day') || date.isSame(event.end, 'day')
        );
        return (
          <ul>
            {filteredEvents.map((event) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        );
      }}
    />
  );
};

export default DraggableCalendar;
