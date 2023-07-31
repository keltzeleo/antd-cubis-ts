import {
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import {
  Alert,
  Button,
  Calendar,
  Col,
  DatePicker,
  Drawer,
  Popconfirm,
  Row,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { CellRenderInfo } from "rc-picker/lib/interface";
import { useState } from "react";
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

type WaterBooksReschedulingFormProps = {
  selectedEvent: EventData;
  currentScheduledDate: Dayjs | null; // Add currentScheduledDate prop
  onCancel: () => void;
  onApply: () => void;
};

const WaterBooksReschedulingForm: React.FC<WaterBooksReschedulingFormProps> = ({
  selectedEvent,
  currentScheduledDate, // Use the currentScheduledDate prop
  onCancel,
  onApply,
}) => {
  const { date, reader, totalBooks, bookNo, bookDescription } =
    selectedEvent || {};
  const formattedDate = date ? dayjs(date).format("DD-MM-YYYY") : "";

  const handleNewScheduledDateChange = (value: Dayjs | null) => {
    // Handle changes to the new scheduling date if needed
  };

  return (
    <ProForm layout="vertical" submitter={false}>
      <ProForm.Group>
        <ProFormText
          name="currentScheduledDate"
          label="Current Scheduled Date"
          initialValue={
            currentScheduledDate
              ? currentScheduledDate.format("DD-MM-YYYY")
              : ""
          }
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
        <ProFormDatePicker
          name="newScheduledDate"
          label="New Scheduling Date"
          initialValue={date ? dayjs(date) : null}
          style={{ width: "100%" }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="newReader"
          label="New Reader"
          placeholder="Enter new reader"
          style={{ width: "100%" }}
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

// Step 1: Define the type for event data
interface EventData {
  date: string;
  reader: string;
  totalBooks: string;
  bookNo: string;
  bookDescription: string;
}

const WaterBooksScheduler: React.FC = () => {
  const [scheduledBooks, setScheduledBooks] = useState(mockScheduledBooks);
  const [value, setValue] = useState<Dayjs>(dayjs("2023-08-25"));

  const handleMonthPickerChange = (newValue: Dayjs | null) => {
    setValue(newValue || value); // Use the current value if newValue is null
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

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [clickedItemTitle, setClickedItemTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventData>({
    date: "",
    reader: "",
    totalBooks: "",
    bookNo: "",
    bookDescription: "",
  });

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const convertToEventData = (
    event: { type: string; content: string } | undefined
  ): EventData => {
    if (!event) {
      return {
        date: "",
        reader: "",
        totalBooks: "",
        bookNo: "",
        bookDescription: "",
      };
    }

    return {
      date: "",
      reader: "",
      totalBooks: "",
      bookNo: "",
      bookDescription: "",
      ...event,
    };
  };

  const showDrawer = (itemTitle: string, selectedDate: Dayjs) => {
    setIsDrawerVisible(true);
    setClickedItemTitle(itemTitle);
    setSelectedDate(selectedDate);

    // Find the selected event based on the itemTitle
    const selectedDateStr = selectedDate.format("DD-MM-YYYY");
    const listData = scheduledBooks[selectedDateStr] || [];
    const event = listData.find((item) => item.content === itemTitle);

    setSelectedEvent(convertToEventData(event));
  };

  const dateCellRender = (date: Dayjs) => {
    const listData = getListData(date);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li
            key={index}
            onClick={() => showDrawer(item.content, date)}
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
      <ProCard
        title="Site Visit Entry Information"
        bordered
        headerBordered
        collapsible
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Submit
          </Button>
        }
      >
        <ProForm
          style={{ marginBottom: 16 }}
          submitter={false}
          layout="vertical"
          onFinish={(values) => Promise.resolve()} // Return a resolved promise with void
          initialValues={{
            No: "",
            Task: "",
            VisitBy: "",
            VisitDate: undefined,
            Status: "",
            Reason: "",
            Remark: "",
          }}
        >
          <ProForm.Group>
            <Row gutter={24}>
              <Col span={12}>
                <ProFormText
                  name="No."
                  label="Sequence No"
                  width="md"
                  disabled
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="Task"
                  label="Task Description"
                  width="md"
                  disabled
                />
              </Col>
            </Row>
          </ProForm.Group>
          <div style={{ height: 32 }} />
          <ProForm.Group>
            <Row gutter={24}>
              <Col span={12}>
                <ProFormText name="VisitBy" label="Visit By" width="md" />
              </Col>
              <Col span={12}>
                <ProFormDatePicker
                  name="VisitDate"
                  label="Visit Date"
                  width="md"
                />
              </Col>
            </Row>
          </ProForm.Group>
          <div style={{ height: 32 }} />
          <ProForm.Group>
            <Row gutter={24}>
              <Col span={12}>
                <ProFormSelect
                  name="Status"
                  label="Visit Status"
                  width="md"
                  options={[]}
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  name="Reason"
                  label="Non-Compliance Reason"
                  width="md"
                  options={[]}
                />
              </Col>
            </Row>
          </ProForm.Group>
          <div style={{ height: 32 }} />
          <ProForm.Group>
            <Row gutter={24}>
              <Col span={24}>
                <ProFormItem
                  label="Remark"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 24 }}
                >
                  <ProFormTextArea name="Remark" width="xl" label="_" />
                </ProFormItem>
              </Col>
            </Row>
          </ProForm.Group>
          <div style={{ height: 32 }} />
        </ProForm>
      </ProCard>

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
          width={550}
        >
          {/* Pass the selectedDate prop to the WaterBooksReschedulingForm */}
          <WaterBooksReschedulingForm
            selectedEvent={selectedEvent}
            onCancel={handleCancel}
            onApply={handleApply}
            currentScheduledDate={selectedDate}
          />
        </Drawer>
      </div>
    </>
  );
};

export default WaterBooksScheduler;
