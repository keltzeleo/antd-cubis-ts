import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Alert, Button, Calendar, DatePicker, Drawer } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import './draggableCalendar.css';
import { holidaysMY2023 } from './holidaysMY2023';
import WaterBooksPreviousMonthReschedulingForm from './waterBooksPreviousMonthReschedulingForm';
import './waterBooksSchedule.css';



// Mock Data for demonstration purposes
const mockScheduledBooks: Record<string, { type: string; content: string }[]> = {
  '02-08-2023': [
    { type: 'warning', content: 'Book No. 110112' },
    { type: 'success', content: 'This is a usual event.' },
    { type: 'error', content: 'This is an error event.' },
  ],
  '16-07-2023': [
    { type: 'warning', content: 'This is a warning event' },
    { type: 'success', content: 'This is a very long usual event....' },
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

interface WaterBooksSchedulerProps {
  theme: Theme;
  onCancel: () => void; // Add onCancel to the props interface
  onApply: () => void; // Add onApply to the props interface
  currentScheduledDate: Dayjs; // Add currentScheduledDate to the props interface
}


  const WaterBooksScheduler: React.FC<WaterBooksSchedulerProps> = ({ theme, onCancel, onApply, currentScheduledDate }) => {

  const [scheduledBooks, setScheduledBooks] = useState(mockScheduledBooks);
  const [value, setValue] = useState<Dayjs>(dayjs);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [clickedItemTitle, setClickedItemTitle] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventData | undefined>(undefined); // Update the type here

  const handleEventClick = (event: EventData) => {
    setSelectedEvent(event);
  };

  const handleCancel = () => {
    setSelectedEvent(undefined);
  };

  const handleApply = () => {
    // Handle applying changes for the selected event
    setSelectedEvent(undefined); // Clear the selected event after applying changes
  };

  const isMalaysiaHoliday = (date: Dayjs) => {
    const dateStr = date.format('DD-MM-YYYY');
    return holidaysMY2023.some((holiday) => holiday.date === dateStr);
  };

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

  const cellRender = (current: Dayjs, info: any) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const showDrawer = (itemTitle: string, selectedDate: Dayjs) => {
    setIsDrawerVisible(true);
    setClickedItemTitle(itemTitle);

    const selectedDateStr = selectedDate.format('DD-MM-YYYY');
    const listData = scheduledBooks[selectedDateStr] || [];
    const event = listData.find((item) => item.content === itemTitle);

    setSelectedEvent(
      event
        ? {
          date: selectedDate.format('DD-MM-YYYY'),
          reader: '',
          totalBooks: '',
          bookNo: '',
          bookDescription: '',
          ...event,
        }
        : undefined
    );
  };


  const dateCellRender = (date: Dayjs) => {
    const isWeekend = date.day() === 6 || date.day() === 0; // 6: Saturday, 0: Sunday
    const dateKey = date.format('DD-MM-YYYY');
    const listData = getListData(date);

    const isHoliday = isMalaysiaHoliday(date);
    const holidayName = holidaysMY2023.find((holiday) => holiday.date === date.format('DD-MM-YYYY'))?.name;

    const isToday = date.isSame(dayjs(), 'day');

    return (
      <Droppable droppableId={dateKey} key={dateKey}>
        {(provided) => (
          <ul className="events" ref={provided.innerRef} {...provided.droppableProps}>
            {isToday && (
              <li style={{ color: 'white', backgroundColor: theme.colorPrimary, marginBottom: 5, borderRadius: 8, paddingLeft: 8, fontSize: 12, fontWeight: 600 }}>
                Today
              </li>
            )}
            {isWeekend && (
              <li style={{ color: theme.colorTextSecondary, marginBottom: 5, backgroundColor: theme["red.3"], borderRadius: 8, paddingLeft: 8, fontSize: 10, fontWeight: 600 }}>
                Rest Day
              </li>
            )}
            {isHoliday && (
              <li style={{ color: theme.colorTextSecondary, backgroundColor: theme["geekblue.4"], marginBottom: 5, borderRadius: 8, paddingLeft: 8, fontSize: 10, fontWeight: 600 }}>
                Holiday: {holidayName}
              </li>
            )}
            {listData.map((item, index) => (
              <Draggable key={item.content} draggableId={`${dateKey}-${index}`} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => showDrawer(item.content, date)}
                    className="events-item" // Fixed typo in class name
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

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId !== source.droppableId || destination.index !== source.index) {
      const startDateKey = source.droppableId;
      const endDateKey = destination.droppableId;

      const startList = Array.from(scheduledBooks[startDateKey]);
      const endList = Array.from(scheduledBooks[endDateKey]);

      const [draggedBook] = startList.splice(source.index, 1);
      endList.splice(destination.index, 0, draggedBook);

      const newScheduledBooks = {
        ...scheduledBooks,
        [startDateKey]: startList,
        [endDateKey]: endList,
      };

      setScheduledBooks(newScheduledBooks);
    }
  };

 return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {/* ... (rest of the code) */}
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
            isEventSelected={!!selectedEvent}
            selectedEvent={selectedEvent}
            onCancel={handleCancel}
            onApply={handleApply}
            currentScheduledDate={value}
          />
        </Drawer>
      </div>
    </DragDropContext>
  );
};
export default WaterBooksScheduler;
