import { Alert, Button, Calendar, DatePicker, Drawer } from "antd";
import axios from "axios";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import Legend from "../../customComponents/Legend/Legend";
import "./draggableCalendar.css";
import { holidaysMY2023 } from "./holidaysMY2023";
import WaterBooksPreviousMonthReschedulingForm from "./waterBooksPreviousMonthReschedulingForm";
import "./waterBooksSchedule.css";

// Simple Unique ID Generator Function
const generateUniqueID = () => {
  const timestamp = new Date().getTime().toString(16); // Convert timestamp to hexadecimal
  const randomNum = Math.random().toString(16).substr(2); // Generate random hexadecimal number
  return timestamp + randomNum; // Combine timestamp and random number
};

interface LegendItem {
  category: string;
  label: string;
  color: string;
  style?: React.CSSProperties; // Add style property here
}

interface Theme {
  [key: string]: string;
}

interface WaterBooksSchedulerProps {
  theme: Theme;
}

interface EventData {
  id: string; // Add unique ID for each event
  content: string; // Add the 'content' property
  date: string;
  reader: string;
  bookNo: string;
  totalBooks: string;
  bookDescription: string;
}

// Mock Data with Unique IDs
const mockScheduledBooks: Record<string, EventData[]> = {
  "02-08-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 1",
      date: "02-08-2023",
      reader: "John Doe",
      bookNo: "B001",
      totalBooks: "5",
      bookDescription: "Event 1 round",
    },
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 2",
      date: "02-08-2023",
      reader: "Jane Smith",
      bookNo: "B002",
      totalBooks: "3",
      bookDescription: "Event 2 round",
    },
    // Add more events as needed
  ],
  "26-07-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 3",
      date: "26-07-2023",
      reader: "Alice Johnson",
      bookNo: "B003",
      totalBooks: "2",
      bookDescription: "Event 3 round",
    },
    // Add more events as needed
  ],
};

const WaterBooksScheduler: React.FC<WaterBooksSchedulerProps> = ({ theme }) => {
  const [scheduledBooks, setScheduledBooks] =
    useState<Record<string, EventData[]>>(mockScheduledBooks);
  const [value, setValue] = useState<Dayjs>(dayjs);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [clickedItemTitle, setClickedItemTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventData>({
    id: "",
    content: "", // Add the 'content' property
    date: "",
    reader: "",
    bookNo: "",
    totalBooks: "",
    bookDescription: "",
  });
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedSchedulingDate, setSelectedSchedulingDate] =
    useState<Dayjs | null>(null);

  // Mock Data with Unique IDs

  const legendData: LegendItem[] = [
    {
      category: "rest-day",
      label: "Rest Day",
      color: theme["red.3"],
      style: { backgroundColor: theme["red.2"] }, // Specify the style here
    },
    {
      category: "holiday",
      label: "Holiday",
      color: theme["geekblue.3"],
    },
    {
      category: "scheduled",
      label: "Scheduled",
      color: theme["yellow.3"],
    },
    {
      category: "unscheduled",
      label: "Unscheduled",
      color: theme["shades.2"],
    },
    // Add more legend items as needed
  ];

  // Function to check if a date is a holiday in Malaysia
  const isMalaysiaHoliday = (date: Dayjs) => {
    const dateStr = date.format("DD-MM-YYYY");
    return holidaysMY2023.some((holiday) => holiday.date === dateStr);
  };

  const fetchMalaysiaHolidays = async () => {
    try {
      const response = await axios.get(
        "https://date.nager.at/Api/v2/PublicHoliday/2023/MY"
      );
      const holidayData = response.data;
      const formattedHolidayData = holidayData.map((holiday: any) => {
        return {
          ...holiday,
          date: dayjs(holiday.date).format("DD-MM-YYYY"),
        };
      });
      setScheduledBooks({ ...scheduledBooks, ...formattedHolidayData });
    } catch (error) {
      console.error("Failed to fetch Malaysia holidays:", error);
    }
  };

  const handleMonthPickerChange = (newValue: Dayjs | null) => {
    setValue(newValue || value);
  };

  const handleCancel = () => {
    setIsDrawerVisible(false);
  };

  const handleApply = () => {
    // Apply the new scheduling date logic here
    setIsDrawerVisible(false);
  };

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const getListData = (date: Dayjs) => {
    const dateKey = date.format("DD-MM-YYYY");
    return scheduledBooks[dateKey] || [];
  };

  const getMonthData = (date: Dayjs) => {
    if (date.month() === 6 && date.year() === 2023) {
      return 1394; // Mock backlog number for July 2023
    }
    return null;
  };

  const monthCellRender = (date: Dayjs) => {
    const num = getMonthData(date);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  // Function to get the index of the item within the date cell
  const getItemIndex = (itemId: string, dateKey: string) => {
    const dateEvents = scheduledBooks[dateKey];
    if (!dateEvents) return -1;

    return dateEvents.findIndex((event) => event.id === itemId);
  };

  const convertToEventData = (event: EventData | undefined): EventData => {
    if (!event) {
      return {
        id: "",
        content: "", // Add 'content' property
        date: "",
        reader: "",
        totalBooks: "",
        bookNo: "",
        bookDescription: "",
      };
    }

    return {
      ...event,
    };
  };

  const showDrawer = (itemTitle: string, selectedDate: Dayjs) => {
    setIsDrawerVisible(true);
    setClickedItemTitle(itemTitle);
    setSelectedDate(selectedDate);

    setSelectedSchedulingDate(selectedDate);

    // Find the selected event based on the itemTitle
    const selectedDateStr = selectedDate.format("DD-MM-YYYY");
    const listData = scheduledBooks[selectedDateStr] || [];
    const event = listData.find((item) => item.content === itemTitle);

    setSelectedEvent(convertToEventData(event));
  };

  const dateCellRender = (date: Dayjs) => {
    const isWeekend = date.day() === 6 || date.day() === 0; // 6: Saturday, 0: Sunday
    const listData = getListData(date);
    const isHoliday = isMalaysiaHoliday(date);

    return (
      <ul className="events">
        {isHoliday && (
          <div
            style={{
              color: theme.colorTextSecondary,
              backgroundColor: theme["geekblue.3"],
              marginBottom: 5,
              borderRadius: 8,
              paddingLeft: 8,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            Holiday:{" "}
            {
              holidaysMY2023.find(
                (holiday) => holiday.date === date.format("DD-MM-YYYY")
              )?.name
            }
          </div>
        )}
        {isWeekend && (
          <div
            style={{
              color: theme.colorTextSecondary,
              marginBottom: 5,
              backgroundColor: theme["red.3"],
              borderRadius: 8,
              paddingLeft: 8,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            Rest Day
          </div>
        )}
        <Droppable droppableId={`dateCell_${date.format("DD-MM-YYYY")}`}>
          {(provided) => (
            <div ref={provided.innerRef} style={{ position: "relative" }}>
              {listData.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => showDrawer(item.content, date)}
                      className={
                        snapshot.isDragging
                          ? "previous-month-event-item dragging-item"
                          : "previous-month-event-item"
                      }
                    >
                      <span
                        style={{
                          borderRadius: 16,
                          width: "100%",
                          backgroundColor: theme["yellow.3"],
                          fontSize: 12,
                          fontWeight: 600,
                          margin: -6,
                          padding: 4,
                        }}
                      >
                        {item.bookNo} - {item.totalBooks}
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ul>
    );
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Get the date keys from droppableIds
    const sourceDateKey = source.droppableId.split("_")[1]; // Extract the date part
    const destinationDateKey = destination.droppableId.split("_")[1]; // Extract the date part

    // Find the events lists for source and destination dates
    const sourceEvents = scheduledBooks[sourceDateKey] || [];
    const destinationEvents = scheduledBooks[destinationDateKey] || [];

    // Get the dragged event
    const draggedEvent = sourceEvents[source.index];

    // Remove the dragged event from the source list
    const newSourceEvents = [...sourceEvents];
    newSourceEvents.splice(source.index, 1);

    // If the event is dropped within the same date, just reorder the list
    if (sourceDateKey === destinationDateKey) {
      newSourceEvents.splice(destination.index, 0, draggedEvent);

      const newScheduledBooks = {
        ...scheduledBooks,
        [sourceDateKey]: newSourceEvents,
      };

      setScheduledBooks(newScheduledBooks);
      return;
    }

    // If the event is dropped in a different date, update the date for the event
    const updatedEvent = {
      ...draggedEvent,
      date: destinationDateKey,
    };

    const newDestinationEvents = [...destinationEvents];
    newDestinationEvents.splice(destination.index, 0, updatedEvent);

    const newScheduledBooks = {
      ...scheduledBooks,
      [sourceDateKey]: newSourceEvents,
      [destinationDateKey]: newDestinationEvents,
    };

    setScheduledBooks(newScheduledBooks);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Legend legendData={legendData} theme={theme} />
          <Alert
            message={`You selected date: ${value?.format("DD-MM-YYYY")}`}
            style={{ margin: "0 8" }}
          />
          <Button onClick={() => setValue(value.subtract(1, "month"))}>
            «
          </Button>
          <DatePicker.MonthPicker
            value={value}
            onChange={handleMonthPickerChange}
            placeholder="Select month"
            style={{ margin: "0 8" }}
            format="MM-YYYY" // Add this line to set the correct format for the API call
          />{" "}
          <Button onClick={() => setValue(value.add(1, "month"))}>»</Button>
        </div>

        <div>
          <Calendar
            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
          />
          <Drawer
            title={
              <span style={{ color: theme.colorTextBase }}>
                Water Books Rescheduling -{" "}
                {clickedItemTitle || "No Item Selected"}
              </span>
            }
            placement="right"
            style={{ backgroundColor: theme.colorBgBase }}
            closable={true}
            onClose={() => setIsDrawerVisible(false)}
            visible={isDrawerVisible}
            width={550}
          >
            {" "}
            <WaterBooksPreviousMonthReschedulingForm
              theme={theme}
              selectedEvent={selectedEvent}
              onCancel={handleCancel}
              onApply={handleApply}
              currentScheduledDate={selectedDate}
            />
          </Drawer>
        </div>
      </div>
    </DragDropContext>
  );
};

export default WaterBooksScheduler;
