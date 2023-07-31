import ProForm, { ProFormText } from "@ant-design/pro-form";
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

// Step 1: Define the type for WaterBooksReschedulingForm props
type WaterBooksReschedulingFormProps = {
  selectedEvent: {
    date: string;
    reader: string;
    totalBooks: string;
    bookNo: string;
    bookDescription: string;
  };
  onCancel: () => void;
  onApply: () => void;
};

// Step 2: Define the WaterBooksReschedulingForm component with proper props
const WaterBooksReschedulingForm: React.FC<WaterBooksReschedulingFormProps> = ({
  selectedEvent = {}, // Provide default value as an empty object
  onCancel,
  onApply,
}) => {
  const { date, reader, totalBooks, bookNo, bookDescription } =
    selectedEvent || {};

  const formattedDate = date ? dayjs(date).format("DD-MM-YYYY") : "";

  return (
    <ProForm layout="vertical">
      <ProForm.Group>
        <ProFormText
          name="currentScheduledDate"
          label="Current Scheduled Date"
          initialValue={formattedDate}
          disabled
        />
        <ProFormText
          name="reader"
          label="Reader"
          initialValue={reader}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="totalBooks"
          label="Total Book"
          initialValue={totalBooks}
          disabled
        />
        <ProFormText
          name="bookNo"
          label="Book No"
          initialValue={bookNo}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="bookDescription"
          label="Book Description"
          initialValue={bookDescription}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="newScheduledDate"
          label="New Scheduling Date"
          initialValue={formattedDate}
          fieldProps={{ placeholder: "Select new scheduling date" }}
          widgetProps={{
            style: { width: "100%" },
            onChange: (value) => {
              // Handle changes to the new scheduling date if needed
            },
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="newReader"
          label="New Reader"
          fieldProps={{ placeholder: "Enter new reader" }}
          widgetProps={{
            style: { width: "100%" },
            onChange: (value) => {
              // Handle changes to the new reader if needed
            },
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <Button onClick={onCancel}>Cancel</Button>
        <Popconfirm
          title="Are you sure you want to apply the new scheduling date?"
          onConfirm={onApply}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Apply New Scheduling Date</Button>
        </Popconfirm>
      </ProForm.Group>
    </ProForm>
  );
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

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [clickedItemTitle, setClickedItemTitle] = useState("");
  const [selectedEvent, setSelectedEvent] =
    useState<WaterBooksReschedulingFormProps["selectedEvent"]>();

  const showDrawer = (itemTitle: string) => {
    setIsDrawerVisible(true);
    setClickedItemTitle(itemTitle);

    // Find the selected event based on the itemTitle
    const selectedDate = value.format("DD-MM-YYYY");
    const listData = scheduledBooks[selectedDate] || [];
    const event = listData.find((item) => item.content === itemTitle);

    setSelectedEvent(event || {});
  };

  const dateCellRender = (date: Dayjs) => {
    const listData = getListData(date);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li
            key={index}
            onClick={() => showDrawer(item.content)}
            className="previous-month-event-item"
          >
            {item.content}
          </li>
        ))}
      </ul>
    );
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
        <Button onClick={() => setValue(value.subtract(1, "month"))}>«</Button>
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
        <Drawer
          title={`Water Books Rescheduling - ${
            clickedItemTitle || "No Item Selected"
          }`}
          placement="right"
          closable={true}
          onClose={() => setIsDrawerVisible(false)}
          visible={isDrawerVisible}
          width={450}
        >
          {/* Step 3: Pass the required props to the WaterBooksReschedulingForm */}
          <WaterBooksReschedulingForm
            selectedEvent={selectedEvent || {}}
            onCancel={handleCancel}
            onApply={handleApply}
          />
        </Drawer>
      </div>
    </>
  );
};

export default WaterBooksScheduler;
