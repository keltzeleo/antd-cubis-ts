import React, { useState } from "react";
import { Calendar } from "antd";
import moment from "moment";
import "moment/locale/en-gb";
import dayjs, { Dayjs } from "dayjs";
import { PickerLocale } from "antd/es/date-picker/generatePicker";

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
    const [events, setEvents] = useState<Event[]>(initialEvents);
  
    const onDragEnd = (event: React.DragEvent<HTMLElement>) => {
      const data = event.dataTransfer.getData("text/plain");
      const { start, end } = JSON.parse(data);
      const updatedEvents = events.map((e) => {
        if (e.id.toString() === event.currentTarget.id) {
          e.start = moment(start).toDate();
          e.end = moment(end).toDate();
        }
        return e;
      });
      setEvents(updatedEvents);
    };
  
    // Complete lang object
    const lang = {
      locale: "en-gb",
      today: "Today",
      now: "Now",
      backToToday: "Back to Today",
      yearFormat: "YYYY",
      month: "Month",
      year: "Year",
      timeSelect: "Select time",
      dateSelect: "Select date",
      monthSelect: "Choose a month",
      yearSelect: "Choose a year",
      decadeSelect: "Choose a decade",
      dayFormat: "D",
      dateFormat: "M/D/YYYY",
      dateTimeFormat: "M/D/YYYY HH:mm:ss",
      monthFormat: "MMMM",
      monthBeforeYear: true,
      previousMonth: "Previous month (PageUp)",
      nextMonth: "Next month (PageDown)",
      previousYear: "Last year (Control + left)",
      nextYear: "Next year (Control + right)",
      previousDecade: "Last decade",
      nextDecade: "Next decade",
      previousCentury: "Last century",
      nextCentury: "Next century",
    };
  
    return (
        <Calendar<Dayjs>
          locale={lang}
          events={events}
          onDragEnd={onDragEnd}
          draggable
          style={{ height: "600px" }}
        />
      );
    };
    
  
  export default DraggableCalendar;