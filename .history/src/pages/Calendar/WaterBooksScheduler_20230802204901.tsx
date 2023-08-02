import { Alert, Button, Calendar, DatePicker, Drawer } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DateHolidays from 'date-holidays'; // Import date-holidays library
import axios from 'axios';
import WaterBooksPreviousMonthReschedulingForm from './waterBooksPreviousMonthReschedulingForm';
import './waterBooksSchedule.css';
import { holidaysMY2023 } from './holidaysMY2023';
import Legend from '../../customComponents/Legend/Legend';

  // Mock Data for demonstration purposes
  const mockScheduledBooks: Record<string, { type: string; content: string; }[]> =
  {
    '03-08-2023': [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' },
    ],
    '26-07-2023': [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event....' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' },
    ],
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
  date: string;
  reader: string;
  totalBooks: string;
  bookNo: string;
  bookDescription: string;
}

const WaterBooksScheduler: React.FC<WaterBooksSchedulerProps> = ({ theme }) => {
  const [value, setValue] = useState<Dayjs>(dayjs);
  const [scheduledBooks, setScheduledBooks] = useState(mockScheduledBooks);



  const legendData: LegendItem[] = [
    {
      category: 'rest-day',
      label: 'Rest Day',
      color: theme['red.3'],
      style: { backgroundColor: theme['red.2'] }, // Specify the style here
    },
    {
      category: 'holiday',
      label: 'Holiday',
      color: theme['geekblue.3'],
    },
    {
      category: 'scheduled',
      label: 'Scheduled',
      color: theme['yellow.3'],
    },
    {
      category: 'unscheduled',
      label: 'Unscheduled',
      color: theme['shades.2'],
    },
    // Add more legend items as needed
  ];


  // Function to check if a date is a holiday in Malaysia
  const isMalaysiaHoliday = (date: Dayjs) => {
    const dateStr = date.format('DD-MM-YYYY');
    return holidaysMY2023.some((holiday) => holiday.date === dateStr);
  };

  useEffect(() => {
    const fetchMalaysiaHolidays = async () => {
      try {
        const response = await axios.get('https://date.nager.at/Api/v2/PublicHoliday/2023/MY');
        const holidayData = response.data;
        const malaysiaHolidays = new DateHolidays('MY');
        malaysiaHolidays.init(holidayData);
        setScheduledBooks({ ...scheduledBooks, ...holidayData });
      } catch (error) {
        console.error('Failed to fetch Malaysia holidays:', error);
      }
    };

    fetchMalaysiaHolidays();
  }, []);

  const handleMonthPickerChange = (newValue: Dayjs | null) => {
    setValue(newValue || value);
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
    const dateKey = date.format('DD-MM-YYYY');
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

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
const [clickedItemTitle, setClickedItemTitle] = useState('');
const [selectedEvent, setSelectedEvent] = useState(null);
const [selectedDate, setSelectedDate] = useState(null);

  const dateCellRender = (date: Dayjs) => {
    const listData = getListData(date);
    const dateKey = date.format('DD-MM-YYYY');
  
    return (
      <ul className="events">
        {/* ...existing rendering code... */}
        <Droppable droppableId={dateKey}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {listData.map((item, index) => (
                <Draggable key={item.content} draggableId={item.content} index={index}>
                  {(provided) => (
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {item.content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </ul>
    );
  };
  
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
  
    // Moving from one list to another
    const startEvents = [...scheduledBooks[source.droppableId]];
    const finishEvents = [...scheduledBooks[destination.droppableId]];
  
    // Remove event from the old date
    const [removed] = startEvents.splice(source.index, 1);
  
    // Add event to the new date
    finishEvents.splice(destination.index, 0, removed);
  
    setScheduledBooks({
      ...scheduledBooks,
      [source.droppableId]: startEvents,
      [destination.droppableId]: finishEvents,
    });
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>      
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}
        >
          <Legend legendData={legendData} theme={theme} />
          <Alert
            message={`You selected date: ${value?.format('DD-MM-YYYY')}`}
            style={{ margin: '0 8' }}
          />
          <Button onClick={() => setValue(value.subtract(1, 'month'))}>
            «
          </Button>
          <DatePicker.MonthPicker
            value={value}
            onChange={handleMonthPickerChange}
            placeholder="Select month"
            style={{ margin: '0 8' }}
          />
          <Button onClick={() => setValue(value.add(1, 'month'))}>»</Button>
        </div>

        <div>
          <Calendar
            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
          />
      <Drawer
      title={
        <span style={{ color: theme.colorTextBase }}>
          Water Books Rescheduling - {clickedItemTitle || 'No Item Selected'}
        </span>
      }
      placement="right"
      style={{ backgroundColor: theme.colorBgBase }}
      closable={true}
      onClose={() => setIsDrawerVisible(false)}
      visible={isDrawerVisible}
      width={550}
    >
      <WaterBooksPreviousMonthReschedulingForm
        theme={theme}
        selectedEvent={selectedEvent}
        onCancel={handleCancel}
        onApply={handleApply}
        currentScheduledDate={selectedDate}
      />
    </Drawer>
  </DragDropContext>
  );
};

export default WaterBooksScheduler;
