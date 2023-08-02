import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "antd";
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

  const handleEventChange = (changedEvent: Event) => {
    const updatedEvents = events.map((event) =>
      event.id === changedEvent.id ? changedEvent : event
    );
    setEvents(updatedEvents);
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      onEventChange={handleEventChange}
      selectable
      resizable
      style={{ height: "600px" }}
    />
  );
};

export default DraggableCalendar;
