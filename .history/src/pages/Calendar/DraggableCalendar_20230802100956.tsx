import React, { useState } from "react";
import { Calendar, Draggable } from "antd";
import moment from "moment";

const localizer = momentLocalizer(moment);

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
    setEvents((prevEvents) => {
      return prevEvents.map((e) => {
        if (e.id === event.id) {
          e.start = start;
          e.end = end;
        }
        return e;
      });
    });
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      draggable
      style={{ height: "600px" }}
    />
  );
};

export default DraggableCalendar;