import { Alert, Button, Calendar, DatePicker, Drawer, Popconfirm } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import React, { useState } from "react";
import "./waterBooksSchedule.css";

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

  const handleMonthPickerChange = (newValue: Dayjs | null) => {
    setValue(newValue || value); // Use the current value if newValue is null
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

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  // Step 1: Create a new state to track the drawer visibility
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [clickedItemTitle, setClickedItemTitle] = useState("");

  // Step 2: Function to open the drawer
  const showDrawer = (itemTitle: string) => {
    setIsDrawerVisible(true);
    setClickedItemTitle(itemTitle);
  };

  // Step 3: Modify dateCellRender function
  const dateCellRender = (date: Dayjs) => {
    const listData = getListData(date);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li
            key={index}
            onClick={() => showDrawer(item.content)}
            className="previous-month-event-item" // Add a class name for event items
          >
            {item.content}
          </li>
        ))}
      </ul>
    );
  };

  // Step 4: Create the Water Books Rescheduling form inside the Drawer component
  const WaterBooksReschedulingForm = ({ selectedEvent, onCancel, onApply }) => {
    // Destructuring selectedEvent to get relevant data
    const { date, reader, totalBooks, bookNo, bookDescription } =
      selectedEvent || {};

    return (
      <div>
        {/* Current Scheduled Date */}
        <div>
          <label>Current Scheduled Date:</label>
          <input type="text" value={date || ""} readOnly />
        </div>

        {/* Reader and Total Book */}
        <div>
          <label>Reader:</label>
          <input type="text" value={reader || ""} readOnly />
          <label>Total Book:</label>
          <input type="text" value={totalBooks || ""} readOnly />
        </div>

        {/* Book No and Book Description */}
        <div>
          <label>Book No:</label>
          <input type="text" value={bookNo || ""} readOnly />
          <label>Book Description:</label>
          <input type="text" value={bookDescription || ""} readOnly />
        </div>

        {/* New Scheduling Date */}
        <div>
          <label>New Scheduling Date:</label>
          <DatePicker
            value={date ? dayjs(date) : null}
            placeholder="Select new scheduling date"
          />
        </div>

        {/* Reader Input */}
        <div>
          <label>Reader:</label>
          <input type="text" placeholder="Enter new reader" />
        </div>

        {/* Cancel button and Apply New Scheduling Date */}
        <div>
          <Button onClick={onCancel}>Cancel</Button>
          <Popconfirm
            title="Are you sure you want to apply the new scheduling date?"
            onConfirm={onApply}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Apply New Scheduling Date</Button>
          </Popconfirm>
        </div>
      </div>
    );
  };

  // Step 5: Create a new state to store the selected event when an event item is clicked
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Step 6: Define functions to handle Cancel and Apply New Scheduling Date
  const handleCancel = () => {
    setIsDrawerVisible(false); // Hide the drawer when the Cancel button is clicked
  };

  const handleApply = () => {
    // Implement the logic to apply the new scheduling date and update the calendar
    // Once done, you can hide the drawer
    setIsDrawerVisible(false);
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
          message={`You selected date: ${value?.format("DD-MM-YYYY")}`}
          style={{ margin: "0 8" }}
        />
        {/* Add navigation buttons */}
        <Button onClick={() => setValue(value.subtract(1, "month"))}>«</Button>
        {/* Month picker */}
        <DatePicker.MonthPicker
          value={value}
          onChange={handleMonthPickerChange}
          placeholder="Select month"
          style={{ margin: "0 8" }}
        />
        <Button onClick={() => setValue(value.add(1, "month"))}>»</Button>
      </div>

      <div>
        <Calendar
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          cellRender={cellRender}
        />
        {/*  Drawer component */}
        <Drawer
          title={`Water Books Rescheduling - ${
            clickedItemTitle || "No Item Selected"
          }`}
          placement="right"
          closable={true}
          onClose={() => setIsDrawerVisible(false)}
          visible={isDrawerVisible}
          width={400}
        >
          <WaterBooksReschedulingForm
            selectedEvent={selectedEvent}
            onCancel={handleCancel}
            onApply={handleApply}
          />
        </Drawer>
      </div>
    </>
  );
};

// Step 8: Create the Water Books Rescheduling form inside the Drawer component
interface SelectedEvent {
  date: string;
  reader: string;
  totalBooks: string;
  bookNo: string;
  bookDescription: string;
}

const WaterBooksReschedulingForm: React.FC<{
  selectedEvent: SelectedEvent | null;
  onCancel: () => void;
  onApply: () => void;
}> = ({ selectedEvent, onCancel, onApply }) => {
  // Destructuring selectedEvent to get relevant data
  const { date, reader, totalBooks, bookNo, bookDescription } =
    selectedEvent || {};

  return (
    <div>
      {/* Current Scheduled Date */}
      <div>
        <label>Current Scheduled Date:</label>
        <input type="text" value={date || ""} readOnly />
      </div>

      {/* Reader and Total Book */}
      <div>
        <label>Reader:</label>
        <input type="text" value={reader || ""} readOnly />
        <label>Total Book:</label>
        <input type="text" value={totalBooks || ""} readOnly />
      </div>

      {/* Book No and Book Description */}
      <div>
        <label>Book No:</label>
        <input type="text" value={bookNo || ""} readOnly />
        <label>Book Description:</label>
        <input type="text" value={bookDescription || ""} readOnly />
      </div>

      {/* New Scheduling Date */}
      <div>
        <label>New Scheduling Date:</label>
        <DatePicker
          value={date ? dayjs(date) : null}
          placeholder="Select new scheduling date"
        />
      </div>

      {/* Reader Input */}
      <div>
        <label>Reader:</label>
        <input type="text" placeholder="Enter new reader" />
      </div>

      {/* Cancel button and Apply New Scheduling Date */}
      <div>
        <Button onClick={onCancel}>Cancel</Button>
        <Popconfirm
          title="Are you sure you want to apply the new scheduling date?"
          onConfirm={onApply}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Apply New Scheduling Date</Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default WaterBooksScheduler;

export default WaterBooksScheduler;
