import { Alert, Button, Calendar, DatePicker, Drawer } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import WaterBooksPreviousMonthReschedulingForm from './waterBooksPreviousMonthReschedulingForm';
import './waterBooksSchedule.css';

// Mock Data for demonstration purposes
const mockScheduledBooks: Record<string, { type: string; content: string }[]> =
  {
    '10-07-2023': [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' },
    ],
    '16-07-2023': [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event....' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' },
    ],
  };

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
  const [scheduledBooks, setScheduledBooks] = useState(mockScheduledBooks);
  const [value, setValue] = useState<Dayjs>(dayjs('2023-08-25'));

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



  const legendStyles: Record<string, React.CSSProperties> = {
    scheduled: { backgroundColor: theme["yellow.2"] },
    unscheduled: { backgroundColor: theme["green.2"] },
    holiday: { backgroundColor: theme["geekblue.2"] },
    restDay: { backgroundColor: theme["red.2"] },
  };
  
  const eventLegend: Record<string, string> = {
    scheduled: "Scheduled",
    unscheduled: "Unscheduled",
    holiday: "Holiday",
    restDay: "Rest Day",
  };


  const getListData = (date: Dayjs) => {
    const dateKey = date.format('DD-MM-YYYY');
    const listData = scheduledBooks[dateKey] || [];
  
    // Check if it's a Saturday or Sunday (Rest Day)
    if (date.day() === 0 || date.day() === 6) {
      return [{ type: 'restDay', content: 'Rest Day' }];
    }
  
    // Check if it's a holiday (You need to provide a list of Malaysia's holidays)
    const malaysiaHolidays: string[] = ['2023-08-31', '2023-09-16', /* Add more holidays */];
    if (malaysiaHolidays.includes(date.format('YYYY-MM-DD'))) {
      return [{ type: 'holiday', content: 'Holiday' }];
    }
  
    // If it's not a rest day or holiday, return the scheduled or unscheduled events
    const hasScheduledBooks = listData.length > 0;
    const eventType = hasScheduledBooks ? 'scheduled' : 'unscheduled';
    return [{ type: eventType, content: eventLegend[eventType] }];
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
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
  
    // Calculate the day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = current.day();
  
    // Check if the current day is a rest day (Saturday or Sunday)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return <div style={legendStyles.restDay}>Rest Day</div>;
    }
  
    // Check if the current day is a holiday (you can implement the logic to check Malaysia's holidays here)
    // For demonstration purposes, we'll just assume the 16th of every month as a holiday.
    if (current.date() === 16) {
      return <div style={legendStyles.holiday}>Holiday</div>;
    }
  
    // Check if the current day has any scheduled events (mock data)
    const listData = getListData(current);
    if (listData.length > 0) {
      return <div style={legendStyles.scheduled}>Scheduled</div>;
    }
  
    // If none of the above conditions are met, it's an unscheduled day.
    return <div style={legendStyles.unscheduled}>Unscheduled</div>;
  };
  
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [clickedItemTitle, setClickedItemTitle] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventData>({
    date: '',
    reader: '',
    totalBooks: '',
    bookNo: '',
    bookDescription: '',
  });

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const convertToEventData = (
    event: { type: string; content: string } | undefined,
  ): EventData => {
    if (!event) {
      return {
        date: '',
        reader: '',
        totalBooks: '',
        bookNo: '',
        bookDescription: '',
      };
    }

    return {
      date: '',
      reader: '',
      totalBooks: '',
      bookNo: '',
      bookDescription: '',
      ...event,
    };
  };


  const showDrawer = (itemTitle: string, selectedDate: Dayjs) => {
    setIsDrawerVisible(true);
    setClickedItemTitle(itemTitle);
    setSelectedDate(selectedDate);

    // Find the selected event based on the itemTitle
    const selectedDateStr = selectedDate.format('DD-MM-YYYY');
    const listData = scheduledBooks[selectedDateStr] || [];
    const event = listData.find((item) => item.content === itemTitle);

    setSelectedEvent(convertToEventData(event));
  };

  const dateCellRender = (date: Dayjs) => {
    const listData = getListData(date);
    const eventType = listData[0]?.type || 'default';

    // Set the CSS variables based on the theme
    const root = document.documentElement;
    root.style.setProperty('--event-background-color', theme[`${eventType}Color`] || 'gray');
    root.style.setProperty('--event-text-color', 'white');
    return (
      <Droppable droppableId={date.format('DD-MM-YYYY')} key={date.format('DD-MM-YYYY')}>
        {(provided) => (
          <ul
            className={`events ${listData[0]?.type}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {listData.map((item, index) => (
              <Draggable
                key={item.content}
                draggableId={item.content}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => showDrawer(item.content, date)}
                    className="previous-month-event-item"
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
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

  const start = scheduledBooks[source.droppableId];
  const finish = scheduledBooks[destination.droppableId];

  if (start === finish) {
    const newList = Array.from(start);
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    const newScheduledBooks = {
      ...scheduledBooks,
      [source.droppableId]: newList,
    };

    setScheduledBooks(newScheduledBooks);
    return;
  }

  // Moving from one list to another
  const startList = Array.from(start);
  const finishList = Array.from(finish);
  const [removed] = startList.splice(source.index, 1);

  finishList.splice(destination.index, 0, removed);

  const newScheduledBooks = {
    ...scheduledBooks,
    [source.droppableId]: startList,
    [destination.droppableId]: finishList,
  };

  setScheduledBooks(newScheduledBooks);
};
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}
        >
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
            cellRender={cellRender}
          />
          <Drawer
            title={
              <span style={{ color: theme.colorTextBase }}>
                Water Books Rescheduling -{' '}
                {clickedItemTitle || 'No Item Selected'}
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
        </div>
      </div>
    </DragDropContext>
  );
};

export default WaterBooksScheduler;
