import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Popconfirm, form } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';
import { FormInstance } from 'antd/lib/form';

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
  const formattedDate = date ? dayjs(date).format('DD-MM-YYYY') : '';

  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    onApply(values.newScheduledDate);
  };

  const handleConfirm = () => {
    // Get the new date from the form
    const newDate = form.getFieldValue('newScheduledDate');
    onApply(newDate);
  };

  return (
    <div style={{ padding: '16px' }}>
      <ProForm layout="vertical" submitter={false} onFinish={handleFinish} form={form}>
        {/* ...rest of your form */}
      </ProForm>
      <Popconfirm
        title="Are you sure you want to apply the new scheduling date?"
        onConfirm={handleConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary">Apply New Scheduling Date</Button>
      </Popconfirm>
    </div>
  );
};

export default WaterBooksPreviousMonthReschedulingForm;
