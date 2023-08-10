import { RightCircleTwoTone } from "@ant-design/icons";
import { Alert, Button, Calendar, DatePicker, Drawer } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import "../../App.css";
import Legend from "../../customComponents/Legend/Legend";
import TransferSample from "./TransferSample";
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
  "28-07-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 4",
      date: "28-07-2023",
      reader: "Alice Johnson",
      bookNo: "B004",
      totalBooks: "2",
      bookDescription: "Event 4 round",
    },
    // Add more events as needed
  ],
  "03-08-2023": [
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 5",
      date: "03-08-2023",
      reader: "Alice Johnson",
      bookNo: "B005",
      totalBooks: "7",
      bookDescription: "Event 5 round",
    },
    {
      id: generateUniqueID(), // Add unique ID for each event
      content: "Event 6",
      date: "03-08-2023",
      reader: "Alice Johnson",
      bookNo: "B006",
      totalBooks: "7",
      bookDescription: "Event 5 round",
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
  const [isDateValuePanelDoubleClicked, setIsDateValuePanelDoubleClicked] =
    useState(false);
  const [previousDate, setPreviousDate] = useState<dayjs.Dayjs | null>(null); // Initialize with null or the initial date
  const [showTransfer, setShowTransfer] = useState(false);
  const [isSingleRowCellDoubleClicked, setIsSingleRowCellDoubleClicked] =
    useState(false);

  const [doubleClickedDate, setDoubleClickedDate] = useState<Dayjs | null>(
    null
  ); // Use doubleClickedDate instead of doubleClickDate
  const [expandedDate, setExpandedDate] = useState<Dayjs | null>(null);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedRightTableColumnDate, setSelectedRightTableColumnDate] =
    useState<Dayjs | null>(null);

  useEffect(() => {
    console.log(
      "Component re-rendered due to change in selectedRightTableColumnDate:",
      selectedRightTableColumnDate?.format("DD-MM-YYYY")
    );
  }, [selectedRightTableColumnDate]);

  // Helper function to handle date cell double-click
  const handleDateCellDoubleClick = (date: Dayjs) => {
    if (!isMalaysiaHoliday(date) && date.day() !== 6 && date.day() !== 0) {
      // If it's not a rest day or holiday, handle the double-click event
      setDoubleClickedDate(date); // Update the doubleClickedDate state with the selected date
      setIsSingleRowCellDoubleClicked(true);
    }
  };

  // Helper function to handle the double-click on the panel (month picker)
  const handleDateValuePanelDoubleClick = () => {
    setShowSingleRow((prevShowSingleRow) => !prevShowSingleRow);
    setShowTransfer((prevShowTransfer) => !prevShowTransfer); // Toggle the visibility of the TransferSample component
  };

  const handleDatePanelChange = (date: Dayjs, mode: string) => {
    console.log("Panel change event:", date.format("YYYY-MM-DD"), mode);
    if (mode === "date") {
      // Add a delay to handle the double-click event
      if (isDateValuePanelDoubleClicked) {
        handleDateValuePanelDoubleClick(); // Switch to the single-row calendar view
      } else {
        // Set the double-click state and reset it after a short delay (300ms)
        setIsDateValuePanelDoubleClicked(true);
        setTimeout(() => {
          setIsDateValuePanelDoubleClicked(false);
        }, 300);
      }
    }
    setValue(date);
  };

  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const [selectedSchedulingDate, setSelectedSchedulingDate] =
    useState<Dayjs | null>(null);

  const [showSingleRow, setShowSingleRow] = useState(false);

  const legendData: LegendItem[] = [
    {
      category: "scheduled",
      label: "Scheduled",
      color: theme["yellow.3"],
    },
    {
      category: "unscheduled",
      label: "Unscheduled",
      color: "transparent",
    },
    {
      category: "today",
      label: "Today",
      color: theme["cyan.3"],
    },
    {
      category: "rest-day",
      label: "Rest Day",
      color: theme["red.3"],
      style: { backgroundColor: theme["red.2"] }, // Specify the style here
    },
    {
      category: "holiday",
      label: "Holiday",
      color: theme["blue.legend"],
    },
    // Add more legend items as needed
  ];

  // Function to check if a date is a holiday in Malaysia

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

  const handlePanelChange = (date: Dayjs, mode: string) => {
    console.log("Panel change event:", date.format("YYYY-MM-DD"), mode);

    // Check if it's a double-click event (mode === "date")
    if (mode === "date") {
      if (isDateValuePanelDoubleClicked) {
        // If it's a double-click, switch to the single-row calendar view
        handleDatePanelDoubleClick();
        setIsDateValuePanelDoubleClicked(false); // Reset the double-click state
      } else {
        // If it's the first click, set the double-click state and reset it after 300ms
        setIsDateValuePanelDoubleClicked(true);
        setTimeout(() => {
          setIsDateValuePanelDoubleClicked(false);
        }, 300);
      }
    }

    setValue(date);
  };

  const handleDatePanelDoubleClick = () => {
    setShowSingleRow((prevShowSingleRow) => !prevShowSingleRow);
    setShowTransfer((prevShowTransfer) => !prevShowTransfer); // Toggle the visibility of the Transfer component
  };

  const onPanelChange = (date: Dayjs, mode: string) => {
    console.log("Panel change event:", date.format("YYYY-MM-DD"), mode);

    // Check if it's a double-click event (mode === "date")
    if (mode === "date") {
      if (isDateValuePanelDoubleClicked) {
        // If it's a double-click, switch to the single-row calendar view
        handleDateValuePanelDoubleClick();
        setIsDateValuePanelDoubleClicked(false); // Reset the double-click state
      } else {
        // If it's the first click, set the double-click state and reset it after 300ms
        setIsDateValuePanelDoubleClicked(true);
        setTimeout(() => {
          setIsDateValuePanelDoubleClicked(false);
        }, 300);
      }
    }

    setValue(date);
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

  const isMalaysiaHoliday = (date: Dayjs) => {
    const dateStr = date.format("DD-MM-YYYY");
    return holidaysMY2023.some((holiday) => holiday.date === dateStr);
  };

  const handleMonthPickerChange = (newValue: Dayjs | null) => {
    setValue(newValue || value);
  };

  const handleSingleRowDateSelect = (date: Dayjs) => {
    if (isSingleRowCellDoubleClicked) {
      // If it's a double-click, show the TransferSample component
      setShowTransfer((prevShowTransfer) => !prevShowTransfer);
      setIsSingleRowCellDoubleClicked(false); // Reset the double-click state
      setExpandedDate((prevExpandedDate) =>
        prevExpandedDate?.isSame(date) ? null : date
      );
    } else {
      // If it's the first click, set the double-click state and reset it after 300ms
      setIsSingleRowCellDoubleClicked(true);
      setTimeout(() => {
        setIsSingleRowCellDoubleClicked(false);
      }, 300);
    }

    setSelectedDate(date); // Always set the selected date
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Function to render the single-row view of the calendar
  function renderSingleRowCalendar(
    selectedDate: Dayjs | null,
    handleDateSelect: (date: Dayjs) => void | null,
    selectedRightTableColumnDate: Dayjs | null,
    handleRightTableColumnDateChange: (date: Dayjs) => void | null
  ) {
    const currentMonth = value.month(); // Get the current month's index (0 to 11)
    const daysInMonth = value.daysInMonth();
    const startOfMonth = value.startOf("month");
    const firstDayOfWeek = startOfMonth.day();
    const startDate = startOfMonth.subtract(firstDayOfWeek, "days");

    const singleRowData = [];
    for (let i = 0; i < daysInMonth; i++) {
      const date = startDate.add(i, "days");
      const isToday = date.isSame(dayjs(), "day"); // Check if the date is the same as today

      if (i === 0 || date.date() === 1) {
        // Add the month name to the first column
        singleRowData.push({
          isMonth: true,
          value: date.format("MMMM"),
        });
      }

      // Add the day of the month to the data
      singleRowData.push({
        isMonth: false,
        value: date.format("D"),
        isToday: isToday,
      });
    }
    const dayColumnWidth = 42; // Set a fixed width for each day column
    const dayColumnHeight = 60; // Set the expanded height for the double-clicked date

    const numMonthsToShow = 3; // Set the number of months to show in the range
    const startMonth = value.clone().subtract(numMonthsToShow - 2, "month");

    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            maxHeight: "200px",
            borderColor: "rgba(0,0,0,0.07)",
            backgroundColor: "transparent",
            color: "transparent",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {Array.from({ length: numMonthsToShow }, (_, monthIndex) => {
              const monthDate = startMonth.clone().add(monthIndex, "month");
              const monthDaysInMonth = monthDate.daysInMonth();
              return (
                <React.Fragment key={`month_${monthIndex}`}>
                  <div
                    style={{
                      flex: 1,
                      border: "1px dotted transparent",
                      padding: "4 16 4 16",
                      textAlign: "center",
                      backgroundColor: "#f5faf9",
                      color: "#00a991",
                      fontWeight: 700,
                      fontFamily: "Play",
                      borderRadius: 16,
                      margin: "2 8 4 8",
                      fontSize: 17,
                      borderColor: "transparent",
                      // textTransform: "uppercase", // Add this line to capitalize the text
                    }}
                  >
                    {monthDate.format("MMMM")}
                  </div>
                  {Array.from({ length: monthDaysInMonth }, (_, dayIndex) => {
                    const date = monthDate
                      .clone()
                      .startOf("month")
                      .add(dayIndex, "day");
                    const isToday = date.isSame(dayjs(), "day");

                    const isHighlighted = selectedDate
                      ? date.isSame(selectedDate, "day")
                      : false;

                    const isHighlightedRightColumn =
                      selectedRightTableColumnDate
                        ? date.isSame(selectedRightTableColumnDate, "day")
                        : false;

                    console.log(
                      "Current cell date:",
                      handleRightTableColumnDateChange
                    );
                    console.log(
                      "Selected date from ProFormDatePicker:",
                      (handleRightTableColumnDateChange = date.isSame(
                        handleRightTableColumnDateChange,
                        "day"
                      ))
                    );

                    const isExpanded = expandedDate
                      ? date.isSame(expandedDate, "day")
                      : false; // Check if the date is the same as the double-clicked date

                    // Check if the date is a weekend (rest day)
                    const isWeekend = date.day() === 6 || date.day() === 0; // 6: Saturday, 0: Sunday

                    // Check if the date is a holiday
                    const isHoliday = isMalaysiaHoliday(date);

                    // Check if the date has scheduled events
                    const dateKey = date.format("DD-MM-YYYY");
                    const hasScheduledEvents =
                      scheduledBooks[dateKey] &&
                      scheduledBooks[dateKey].length > 0;
                    // Set the background color based on whether it's a rest day, holiday, scheduled, or unscheduled day
                    let backgroundColor = "transparent";
                    let color = theme["colorTextBase"]; // Set a default font color (use the text color from the theme)

                    // let fontSize = "14px"; // Set the default font size
                    if (isWeekend) {
                      backgroundColor = theme["red.legend"];
                      color = theme["red.5"];
                    } else if (isHoliday) {
                      backgroundColor = theme["blue.legend"];
                      color = theme["blue.5"];
                    } else if (hasScheduledEvents) {
                      backgroundColor = theme["yellow.legend"];
                      color = theme["colorTextBase"];
                      // fontSize = "16px"; // Set a larger font size for scheduled days
                    } else {
                      backgroundColor = theme["shades.1"];
                      color = theme["colorTextBase"];
                    }

                    // Set the background color for the highlighted day
                    if (isHighlighted) {
                      backgroundColor = theme["colorPrimary"];
                      color = "white"; // Change this to your desired highlight color
                    }

                    if (isHighlightedRightColumn) {
                      backgroundColor = theme["colorPrimary"];
                      color = "white"; // Change this to your desired highlight color
                    }

                    console.log("Rendering date:", date.format("DD-MM-YYYY"));
                    console.log(
                      "Selected Right Column Date:",
                      selectedRightTableColumnDate
                    );
                    console.log(
                      "Is Highlighted Right Column:",
                      isHighlightedRightColumn
                    );

                    // Render the day elements for each month
                    return (
                      <div
                        key={`day_${date.format("YYYYMMDD")}`}
                        // className={`day ${
                        //   isHighlighted ? "highlighted-day-lefttablecolumn" : ""
                        // }`}
                        style={{
                          flex: 1,
                          width: dayColumnWidth,
                          height: dayColumnHeight,
                          border: "1px dotted rgba(0,20,0,0.15)",
                          padding: 10,
                          textAlign: "center",
                          backgroundColor: isToday
                            ? theme["colorPrimaryBg"]
                            : backgroundColor,
                          color: isToday ? theme["colorPrimaryText"] : color,
                          fontFamily: "play",
                          cursor: "pointer",
                          position: "relative", // Add position: relative to the style
                        }}
                        onClick={() => handleSingleRowDateSelect(date)} // Handle single-click on the date cell
                        onDoubleClick={() => handleDateCellDoubleClick(date)} // Handle double-click on the date cell
                      >
                        <div>
                          {selectedRightTableColumnDate && (
                            <span>
                              Date Selected:{" "}
                              {selectedRightTableColumnDate.format(
                                "DD-MM-YYYY"
                              )}
                            </span>
                          )}
                        </div>{" "}
                        {""}
                        <div>{date.format("dd")}</div>{" "}
                        {/* This line displays the day name */}
                        {date.format("D")}
                        {isHighlighted && showTransfer && (
                          <div
                            style={{
                              position: "absolute",
                              paddingTop: 22,
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",

                              // backgroundColor: "rgba(0, 169, 145, 0.2)", // Use a semi-transparent black overlay
                              color: "rgba(0, 169, 145, 0.42)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontWeight: 600,
                              fontSize: 24,
                              fontFamily: "play", // Set the font size (adjust as needed)
                            }}
                          >
                            <RightCircleTwoTone
                              twoToneColor={theme["colorPrimary"]}
                            />{" "}
                          </div>
                        )}
                        {isHighlightedRightColumn && showTransfer && (
                          <div
                            style={{
                              position: "absolute",

                              // paddingTop: 24,
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              backgroundColor: "rgba(0, 0, 0, 0.2)",
                              color: "rgba(255, 255, 255, 1)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontWeight: 700,
                              fontSize: 24,
                              fontFamily: "play",
                            }}
                          >
                            #2
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
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

    // Create Dayjs instances for source and destination dates
    const sourceDate = dayjs(sourceDateKey, "DD-MM-YYYY");
    const destinationDate = dayjs(destinationDateKey, "DD-MM-YYYY");

    // Check if the destination date is a weekend or holiday
    const isWeekend =
      destinationDate.day() === 6 || destinationDate.day() === 0; // 6: Saturday, 0: Sunday
    const isHoliday = isMalaysiaHoliday(destinationDate);

    if (isWeekend || isHoliday) {
      // Prompt an error and return the event to its original date
      alert(
        "Invalid date. The event has been returned to its original date or could not be moved to a restricted date."
      );
      return;
    }

    // Get the dragged event
    const draggedEvent = scheduledBooks[sourceDateKey][source.index];

    // If the event is dropped within the same date, just reorder the list
    if (sourceDateKey === destinationDateKey) {
      const newEvents = Array.from(scheduledBooks[sourceDateKey]);
      newEvents.splice(source.index, 1);
      newEvents.splice(destination.index, 0, draggedEvent);

      const newScheduledBooks = {
        ...scheduledBooks,
        [sourceDateKey]: newEvents,
      };

      setScheduledBooks(newScheduledBooks);
    } else {
      // If the event is dropped in a different date, update the date for the event
      const updatedEvent = {
        ...draggedEvent,
        date: destinationDateKey,
      };

      // Create an empty array for the destination date if it doesn't exist
      createEmptyEventArray(destinationDate);

      const sourceEvents = Array.from(scheduledBooks[sourceDateKey]);
      sourceEvents.splice(source.index, 1);

      const destinationEvents =
        destinationDateKey in scheduledBooks
          ? Array.from(scheduledBooks[destinationDateKey])
          : [];
      destinationEvents.splice(destination.index, 0, updatedEvent);

      const newScheduledBooks = {
        ...scheduledBooks,
        [sourceDateKey]: sourceEvents,
        [destinationDateKey]: destinationEvents,
      };

      setScheduledBooks(newScheduledBooks);
    }
  };

  const dateCellRender = (date: Dayjs) => {
    const isWeekend = date.day() === 6 || date.day() === 0; // 6: Saturday, 0: Sunday
    const listData = getListData(date);
    const isHoliday = isMalaysiaHoliday(date);
    const isToday = date.isSame(dayjs(), "day"); // Check if the date is the same as today

    const dateKey = date.format("DD-MM-YYYY"); // Get the date key

    return (
      <ul className="events">
        {isToday && (
          <div
            style={{
              color: theme.colorTextBase,
              backgroundColor: theme["cyan.3"],
              marginBottom: 5,
              borderRadius: 8,
              paddingLeft: 8,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Today
          </div>
        )}
        {isHoliday && (
          <div
            style={{
              color: theme.colorTextSecondary,
              backgroundColor: theme["geekblue.legend"],
              marginBottom: 5,
              borderRadius: 8,
              paddingLeft: 8,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Holiday:{" "}
            {holidaysMY2023.find((holiday) => holiday.date === dateKey)?.name}
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
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Rest Day
          </div>
        )}
        <Droppable droppableId={`dateCell_${dateKey}`} isDropDisabled={false}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              style={{ position: "relative", height: "100px", width: "100%" }}
              onDoubleClick={() => handleDatePanelDoubleClick()} // Handle double-click on the date cell
            >
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
                          fontSize: 14,
                          fontWeight: 600,
                          margin: "0 -20 -10 0",
                          padding: "2px 16px 2px 8px",
                        }}
                      >
                        {item.bookNo} - {item.totalBooks}
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {/* Render an empty item as a placeholder for dropping events */}
              <Draggable
                key="empty-placeholder"
                draggableId="empty-placeholder"
                index={listData.length}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="previous-month-event-item"
                  >
                    {/* An empty span element to maintain layout */}
                    <span style={{ visibility: "hidden" }}>
                      Empty Placeholder
                    </span>
                  </li>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      </ul>
    );
  };

  // ...

  // Helper function to create an empty array for a given date if it doesn't exist
  const createEmptyEventArray = (date: Dayjs) => {
    const dateKey = date.format("DD-MM-YYYY");
    if (!(dateKey in scheduledBooks)) {
      // Create an empty array for the date if it doesn't exist
      setScheduledBooks((prevScheduledBooks) => ({
        ...prevScheduledBooks,
        [dateKey]: [],
      }));
    }
  };

  const handleToggleSingleRow = () => {
    setShowSingleRow((prevShowSingleRow) => !prevShowSingleRow);
  };

  const handleRightTableColumnDateChange = (date: Dayjs | null) => {
    setSelectedRightTableColumnDate(date); // Update the selectedRightTableColumnDate state
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
            message={`You selected date: ${
              selectedDate ? selectedDate.format("DD-MM-YYYY") : "None"
            }`}
            style={{ margin: "0 8" }}
          />
          <div style={{ marginRight: 16 }}>
            {/* Add the button to toggle single-row view */}
            <Button onClick={handleToggleSingleRow}>
              {showSingleRow
                ? "Switch to Original Month View"
                : "Switch to Single-Row 3 Months View"}
            </Button>
          </div>
          <Button onClick={() => setValue(value.subtract(1, "month"))}>
            «
          </Button>
          <DatePicker.MonthPicker
            value={value}
            onChange={handleMonthPickerChange}
            placeholder="Select month"
            style={{ margin: "0 8" }}
            format="MM-YYYY"
            onPanelChange={handleDatePanelChange} // Use handleDatePanelChange to handle single-click and double-click events
          />
          <Button onClick={() => setValue(value.add(1, "month"))}>»</Button>
        </div>

        <div style={{ marginBottom: 32 }}>
          {/* Render the original calendar or the single-row calendar based on the state */}
          {showSingleRow ? (
            renderSingleRowCalendar(
              selectedDate,
              handleDateSelect,
              selectedRightTableColumnDate, // Pass selectedRightTableColumnDate here
              handleRightTableColumnDateChange // Pass the callback function
            )
          ) : (
            <Calendar
              value={value}
              onSelect={(date) => {
                setSelectedDate(date);

                handleDateSelect(date);
                onSelect(date);
              }}
              onPanelChange={(date, mode) => {
                // Check if the previous date is the same as the current date
                if (previousDate && date.isSame(previousDate, "day")) {
                  // Double-click detected, handle the event
                  handleDatePanelDoubleClick();
                } else {
                  // Single-click detected, update the previousDate
                  setPreviousDate(dayjs(date)); // Convert the date to a Dayjs object
                }
                onPanelChange(date, mode); // Call the original onPanelChange
              }}
              cellRender={dateCellRender}
            />
          )}
          {/* Render the <Transfer> component if showTransfer is true */}
          <div style={{ margin: 32 }}>
            {showTransfer && (
              // Use doubleClickedDate instead of doubleClickDate
              <TransferSample theme={theme} doubleClickedDate={selectedDate} />
            )}
          </div>
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
