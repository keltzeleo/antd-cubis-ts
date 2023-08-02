import React, { useState } from "react";
import { Calendar, Draggable } from "antd";
import moment from "moment";
import momentLocale from "moment-locale";

const localizer = momentLocale("en-US");

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Event 1",
    start: moment().startOf("day").toDate(),
    end: moment().endOf("day").toDate(),
  },
  {
    id: 2,
    title: "Event 2",
    start: moment().add(1, "day").startOf("day").toDate(),
    end: moment().add(1, "day").endOf("day").toDate(),
  },
];

const DraggableCalendar: React.FC = () => {
  const [events, setEvents] = useState(initialEvents);

  const onDragStart = (event) => {
    event.preventDefault();
  };

  const onDragEnd = (event) => {
    const { start, end } = event.nativeEvent.detail;
    const updatedEvents = events.map((e) => {
      if (e.id === event.id) {
        e.start = start;
        e.end = end;
      }
      return e;
    });
    setEvents(updatedEvents);
  };

  return (
    <Calendar
      locale="en-US"
      events={events}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
      style={{ height: "600px" }}
    />
  );
};

export default DraggableCalendar;