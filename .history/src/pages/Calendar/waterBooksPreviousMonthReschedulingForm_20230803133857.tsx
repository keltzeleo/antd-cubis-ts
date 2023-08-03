import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, Popconfirm } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React from "react";

interface Theme {
  [key: string]: string;
}

interface EventData {
  date: string;
  reader: string;
  totalBooks: string;
  bookNo: string;
  bookDescription: string;
}

interface WaterBooksPreviousMonthReschedulingFormProps {
  theme: Theme;
  selectedEvent: EventData;
  currentScheduledDate: Dayjs | null;
  onCancel: () => void;
  onApply: (newDate: Dayjs) => void; // Update the type of onApply
}

const WaterBooksPreviousMonthReschedulingForm: React.FC<
  WaterBooksPreviousMonthReschedulingFormProps
> = ({ theme, selectedEvent, currentScheduledDate, onCancel, onApply }) => {
  const { date, reader, totalBooks, bookNo, bookDescription } =
    selectedEvent || {};

  const todayDate = dayjs().format("DD-MM-YYYY"); // Get today's date in "DD-MM-YYYY" format

  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    onApply(values.newScheduledDate);
  };

  const handleConfirm = () => {
    // Get the new date from the form
    const newDate = form.getFieldValue("newScheduledDate");
    onApply(newDate);
  };

  return (
    <div style={{ padding: "16px" }}>
      <ProForm
        layout="vertical"
        submitter={false}
        onFinish={handleFinish}
        form={form}
      >
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
            initialValue={todayDate} // Get today's date in "DD-MM-YYYY" format
            // Set the initial value to today's date in "DD-MM-YYYY" format
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
            onConfirm={handleConfirm} // Use handleConfirm here
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Apply New Scheduling Date</Button>
          </Popconfirm>
        </ProForm.Group>
      </ProForm>
    </div>
  );
};

export default WaterBooksPreviousMonthReschedulingForm;
