import { Alert, Button, Calendar, DatePicker, Drawer } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import DateHolidays from 'date-holidays'; // Import date-holidays library
import axios from 'axios';
import WaterBooksPreviousMonthReschedulingForm from './waterBooksPreviousMonthReschedulingForm';
import './waterBooksSchedule.css';
import { holidaysMY2023 } from './holidaysMY2023';


// Mock Data for demonstration purposes
const mockScheduledBooks: Record<string, { type: string; content: string }[]> =
  {
    '17-07-2023': [
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
  }

  const legendData: LegendItem[] = [
    { category: 'rest-day', label: 'Rest Day', color: 'theme["red.2"]' },
    { category: 'holiday', label: 'Holiday', color: 'theme["geekblue.2"]' },
    { category: 'scheduled', label: 'Scheduled', color: 'theme["yellow.2"]' },
    { category: 'unscheduled', label: 'Unscheduled', color: 'theme["green.2"]' },
    // Add more legend items as needed
  ];

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
  const [value, setValue] = useState<Dayjs>(dayjs);

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

  const dateCellRender = (date: Dayjs) => {
    const isWeekend = date.day() === 6 || date.day() === 0; // 6: Saturday, 0: Sunday
    const listData = getListData(date);

 // Check if the date is a holiday in Malaysia
 const isHoliday = isMalaysiaHoliday(date);
 const holidayName = holidaysMY2023.find((holiday) => holiday.date === date.format('DD-MM-YYYY'))?.name;

 const isToday = date.isSame(dayjs(), 'day'); // Check if the date is today

    return (
      <ul className="events">
      {isToday && (
        <div style={{ color: 'white', backgroundColor: theme.colorPrimary, marginBottom: 5, borderRadius: 8, paddingLeft: 8, fontSize:12, fontWeight:600 }}>
          Today
        </div>
      )}
              {isWeekend && (
          <div style={{ color: theme.colorTextSecondary, marginBottom: 5, backgroundColor: theme["red.3"], borderRadius: 8, paddingLeft: 8, fontSize: 10}}>
            Rest Day
          </div>
        )}
        {isHoliday && (
          <div style={{color: theme.colorTextSecondary, backgroundColor: theme["geekblue.3"], marginBottom: 5, borderRadius: 8, paddingLeft: 8, fontSize: 10 }}>
            Holiday:{holidayName}
          </div>
        )}
        <Droppable droppableId={date.format('DD-MM-YYYY')}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {listData.map((item, index) => (
                <Draggable key={item.content} draggableId={item.content} index={index}>
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
            </div>
          )}
        </Droppable>
      </ul>
    );
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
            cellRender={dateCellRender}
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