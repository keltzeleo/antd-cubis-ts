import React, { useState } from "react";
import { Calendar } from "antd";
import moment from "moment";
import "moment/locale/en-gb";

const localizer = moment;

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
  
    const onDragStart = (event: React.DragEvent) => {
      event.preventDefault();
    };
  
    const onDragEnd = (event: React.DragEvent) => {
      const { start, end } = event; // Access 'start' and 'end' directly from the 'event' object
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
        locale={{
          lang: {
            locale: "en-gb", // Use the English - Great Britain locale for Malaysia
            today: "Today",
            now: "Now",
            backToToday: "Back to Today",
            yearFormat: "YYYY", // Add the missing 'yearFormat' property
            // Add any other missing properties here as needed
          },
          timePickerLocale: {
            placeholder: "Select time", // You can use the default English placeholder
          },
        }}
        events={events}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable
        style={{ height: "600px" }}
      />
    );
  };
  
  export default DraggableCalendar;