import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "antd";
import moment from "moment";

const [events, setEvents] = React.useState([
    {
      id: 1,
      title: 'Event 1',
      start: new Date('2023-08-01T10:00:00'),
      end: new Date('2023-08-01T12:00:00'),
    },
    {
      id: 2,
      title: 'Event 2',
      start: new Date('2023-08-02T10:00:00'),
      end: new Date('2023-08-02T12:00:00'),
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
