import React, { useState } from "react";
import { Calendar } from "antd";
import "antd/dist/antd.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event as EventType } from "react-big-calendar";
import { format, parse } from "date-fns";
import { CalendarProps } from "react-big-calendar";

const initialEvents: EventType[] = [
  {
    id: 1,
    title: "Event 1",
    start: new Date(),
    end: new Date(),
  },
  {
    id: 2,
    title: "Event 2",
    start: new Date(new Date().getTime() + 86400000),
    end: new Date(new Date().getTime() + 86400000),
  },
];

const DraggableCalendar: React.FC = () => {
  const [events, setEvents] = useState(initialEvents);

  const handleEventChange = (changedEvent: EventType) => {
    const updatedEvents = events.map((event) =>
      event.id === changedEvent.id ? changedEvent : event
    );
    setEvents(updatedEvents);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      onEventResize={handleEventChange}
      onEventDrop={handleEventChange}
      selectable
      resizable
      style={{ height: "600px" }}
    />
  );
};

export default DraggableCalendar;
