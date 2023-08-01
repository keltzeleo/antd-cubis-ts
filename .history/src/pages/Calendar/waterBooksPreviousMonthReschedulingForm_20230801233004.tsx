import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';

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
  onApply: () => void;
}

const WaterBooksPreviousMonthReschedulingForm: React.FC<
  WaterBooksPreviousMonthReschedulingFormProps
> = ({ theme, selectedEvent, currentScheduledDate, onCancel, onApply }) => {
  const { date, reader, totalBooks, bookNo, bookDescription } =
    selectedEvent || {};
  const formattedDate = date ? dayjs(date).format('DD-MM-YYYY') : '';

  const handleNewScheduledDateChange = (value: Dayjs | null) => {
    // Handle changes to the new scheduling date if needed
  };

  return (
    <div
      style={{ padding: '16px', backgroundColor: '#00a991', color: '#121b1c' }}
    >
      <ProForm layout="vertical" submitter={false}>
        <ProForm.Group>
          <ProFormText
            name="currentScheduledDate"
            label="Current Scheduled Date"
            initialValue={
              currentScheduledDate
                ? currentScheduledDate.format('DD-MM-YYYY')
                : ''
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
            style={{ width: '100%' }}
            onChange={handleNewScheduledDateChange}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            name="newReader"
            label="New Reader"
            placeholder="Enter new reader"
            style={{ width: '100%' }}
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
    </div>
  );
};

export default WaterBooksPreviousMonthReschedulingForm;
