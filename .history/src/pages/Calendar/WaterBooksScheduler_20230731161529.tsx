import type { BadgeProps } from "antd";
import { Alert, Badge, Button, Calendar, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import React, { useState } from "react";

// Mock Data for demonstration purposes
const mockScheduledBooks: Record<string, { type: string; content: string }[]> =
  {
    "10-07-2023": [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
      { type: "error", content: "This is error event." },
    ],
    "16-07-2023": [
      { type: "warning", content: "This is warning event" },
      { type: "success", content: "This is very long usual event...." },
      { type: "error", content: "This is error event 1." },
      { type: "error", content: "This is error event 2." },
      { type: "error", content: "This is error event 3." },
      { type: "error", content: "This is error event 4." },
    ],
  };

const WaterBooksScheduler: React.FC = () => {
  const [scheduledBooks, setScheduledBooks] = useState(mockScheduledBooks);
  const [value, setValue] = useState<Dayjs>(dayjs("2023-08-25"));
  const [selectedValue, setSelectedValue] = useState<Dayjs>(
    dayjs("2023-08-25")
  );
  const [rescheduleEventItem, setRescheduleEventItem] = useState<{
    content: string;
    originalDate: Dayjs;
  } | null>(null);

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
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

  const dateCellRender = (date: Dayjs) => {
    const listData = getListData(date);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li
            key={item.content}
            onDoubleClick={() => handleEventDoubleClick(item, date)}
          >
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const handleEventDoubleClick = (
    eventItem: { type: string; content: string },
    date: Dayjs
  ) => {
    setRescheduleEventItem({ content: eventItem.content, originalDate: date });
  };

  const handlePrevMonth = () => {
    setValue(value.subtract(1, "month")); // Use dayjs to subtract one month from the current value
  };

  const handleNextMonth = () => {
    setValue(value.add(1, "month")); // Use dayjs to add one month to the current value
  };

  const handleReschedule = (newDate: Dayjs) => {
    if (rescheduleEventItem) {
      const { content, originalDate } = rescheduleEventItem;

      const dateKey = newDate.format("DD-MM-YYYY");
      const newScheduledBooks = { ...scheduledBooks };

      // Remove the event from the old date
      const oldDateKey = originalDate.format("DD-MM-YYYY");
      newScheduledBooks[oldDateKey] = newScheduledBooks[oldDateKey].filter(
        (event) => event.content !== content
      );

      // Add the event to the new date
      if (!newScheduledBooks[dateKey]) {
        newScheduledBooks[dateKey] = [];
      }
      newScheduledBooks[dateKey].push({ type: "success", content });

      setScheduledBooks(newScheduledBooks);
      setSelectedValue(newDate);
      setRescheduleEventItem(null);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <Alert
          message={`You selected date: ${selectedValue.format("DD-MM-YYYY")}`}
          style={{ margin: "0 8" }}
        />
        {/* Add navigation buttons */}
        <Button onClick={handlePrevMonth}>«</Button>
        {/* Month picker */}
        <DatePicker.MonthPicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
          placeholder="Select month"
          style={{ margin: "0 8" }}
        />
        <Button onClick={handleNextMonth}>»</Button>
      </div>
      <div>
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          cellRender={cellRender}
        />
      </div>
      {/* Modal for rescheduling */}
      {rescheduleEventItem && (
        <div className="modal">
          <h3>Reschedule Event</h3>
          <p>Event: {rescheduleEventItem.content}</p>
          <p>
            Original Date:{" "}
            {rescheduleEventItem.originalDate.format("DD-MM-YYYY")}
          </p>
          <DatePicker
            value={selectedValue}
            onChange={handleReschedule}
            placeholder="Select new date"
          />
          <Button onClick={() => setRescheduleEventItem(null)}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => handleReschedule(selectedValue)}
          >
            Reschedule
          </Button>
        </div>
      )}
    </>
  );
};

export default WaterBooksScheduler;
