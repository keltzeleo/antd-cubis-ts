import {
  Alert,
  Badge,
  Button,
  Calendar,
  DatePicker,
  Drawer,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import React, { useState } from "react";
import { useDrag } from "react-dnd";

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

const DraggableEvent: React.FC<{ item: { type: string; content: string } }> = ({
  item,
}) => {
  const [, drag] = useDrag({
    type: "DRAGGABLE_BADGE",
    item: { content: item.content },
  });

  return (
    <div ref={drag}>
      <Badge status={item.type as BadgeProps["status"]} text={item.content} />
    </div>
  );
};

const RescheduleForm: React.FC<{
  visible: boolean;
  onClose: () => void;
  item: { type: string; content: string };
  originalDate: Dayjs;
  onReschedule: (newDate: Dayjs, newReader: string) => void;
}> = ({ visible, onClose, item, originalDate, onReschedule }) => {
  const [form] = Form.useForm();

  const handleReschedule = async () => {
    try {
      const values = await form.validateFields();
      const { rescheduleDate, newReader } = values;
      onReschedule(rescheduleDate, newReader);
      onClose();
      message.success("Event rescheduled successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Drawer
      title="Reschedule Event"
      visible={visible}
      onClose={onClose}
      width={400}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Popconfirm
            title="Are you sure you want to reschedule this event?"
            onConfirm={handleReschedule}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Reschedule</Button>
          </Popconfirm>
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Scheduled Read Date">
          <Input value={originalDate.format("DD-MM-YYYY")} readOnly />
        </Form.Item>
        <Form.Item label="Reader">
          <Input value="John Doe" readOnly />
        </Form.Item>
        <Form.Item label="Total Book">
          <Input value="3" readOnly />
        </Form.Item>
        <Form.Item label="Book No.">
          <Input value="12345" readOnly />
        </Form.Item>
        <Form.Item label="Book Description">
          <Input value="Book Description" readOnly />
        </Form.Item>
        <Form.Item
          name="rescheduleDate"
          label="Re-Scheduling Date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker placeholder={originalDate.format("DD-MM-YYYY")} />
        </Form.Item>
        <Form.Item
          name="newReader"
          label="New Reader"
          rules={[{ required: true, message: "Please enter a new reader" }]}
        >
          <Input placeholder="Enter new reader" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const WaterBooksScheduler: React.FC = () => {
  const [scheduledBooks, setScheduledBooks] = useState(mockScheduledBooks);
  const [value, setValue] = useState<Dayjs>(dayjs("2023-08-25"));
  const [selectedValue, setSelectedValue] = useState<Dayjs | null>(
    dayjs("2023-08-5")
  );
  const [rescheduleEventItem, setRescheduleEventItem] = useState<{
    type: string;
    content: string;
    originalDate: Dayjs;
  } | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleMonthPickerChange = (newValue: Dayjs | null) => {
    setValue(newValue || value); // Use the current value if newValue is null
  };

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
          <li key={item.content}>
            {/* Make each event draggable and allow rescheduling */}
            <div
              onDoubleClick={() =>
                setRescheduleEventItem({
                  type: item.type,
                  content: item.content,
                  originalDate: date,
                })
              }
            >
              <DraggableEvent item={item} />
            </div>
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

  const handleReschedule = (newDate: Dayjs, newReader: string) => {
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

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
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
          message={`You selected date: ${selectedValue?.format("DD-MM-YYYY")}`}
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
      </div>

      {/* Modal for rescheduling */}
      {rescheduleEventItem && (
        <RescheduleForm
          visible={drawerVisible}
          onClose={closeDrawer}
          item={rescheduleEventItem}
          originalDate={selectedValue || dayjs("2023-08-5")}
          onReschedule={handleReschedule}
        />
      )}
    </>
  );
};

export default WaterBooksScheduler;
