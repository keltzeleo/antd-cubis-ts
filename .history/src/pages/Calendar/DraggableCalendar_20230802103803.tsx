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
  
    const onDragEnd = (event: React.DragEvent<HTMLElement>) => {
      const data = event.dataTransfer.getData("text/plain");
      const { start, end } = JSON.parse(data); // Parse the data string to obtain the start and end properties
      const updatedEvents = events.map((e) => {
        if (e.id.toString() === event.currentTarget.id) {
          e.start = new Date(start);
          e.end = new Date(end);
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
          },
          yearFormat: "YYYY", // Add the 'yearFormat' property
          ...(({} as any) as AdditionalPickerLocaleLangProps), // Cast an empty object to AdditionalPickerLocaleLangProps to satisfy the type
        }}
        events={events}
        onDragEnd={onDragEnd}
        draggable
        style={{ height: "600px" }}
      />
    );
  };
  
  export default DraggableCalendar;