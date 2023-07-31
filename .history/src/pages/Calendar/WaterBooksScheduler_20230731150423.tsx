import type { BadgeProps } from "antd";
import { Alert, Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import React, { useState } from "react";

// Mock Data for demonstration purposes
const mockScheduledBooks: Record<string, { type: string; content: string }[]> =
  {
    "2023-07-10": [
      { type: "warning", content: "This is warning event." },
      { type: "success", content: "This is usual event." },
      { type: "error", content: "This is error event." },
    ],
    "2023-07-15": [
      { type: "warning", content: "This is warning event" },
      { type: "success", content: "This is very long usual event。。...." },
      { type: "error", content: "This is error event 1." },
      { type: "error", content: "This is error event 2." },
      { type: "error", content: "This is error event 3." },
      { type: "error", content: "This is error event 4." },
    ],
  };

const WaterBooksScheduler: React.FC = () => {
  // Mock Data for demonstration purposes
  const [scheduledBooks, setScheduledBooks] = useState(mockScheduledBooks);

  const [value, setValue] = useState(() => dayjs("25-08-2023"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("25-08-2023"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const getListData = (value: Dayjs) => {
    const dateKey = value.format("DD-MM-YYYY");
    return scheduledBooks[dateKey] || [];
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 6 && value.year() === 2023) {
      return 1394; // Mock backlog number for July 2023
    }
    return null;
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
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

  return (
    <>
      <Alert
        message={`You selected date: ${selectedValue?.format("YYYY-MM-DD")}`}
      />
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={cellRender}
      />
    </>
  );
};

export default WaterBooksScheduler;
