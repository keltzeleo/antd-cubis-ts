import React, { useState } from 'react';
import { Calendar, Badge } from 'antd';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { mockEvents } from "./MyEvent";

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
  const [events, setEvents] = useState(mockEvents);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.index === destination.index && source.droppableId === destination.droppableId) return;

    const updatedEvents = [...events];
    const draggedEvent = updatedEvents.splice(source.index, 1)[0];
    updatedEvents.splice(destination.index, 0, draggedEvent);

    setEvents(updatedEvents);
  };

  const eventRender = (date: moment.Moment) => {
    const dateEvents = events.filter((event) => event.date === date.format('YYYY-MM-DD'));

    return (
      <div>
        {dateEvents.map((event, index) => (
          <Draggable key={event.id} draggableId={event.id} index={index}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={{
                  userSelect: 'none',
                  padding: 5,
                  margin: '0 0 8px 0',
                  backgroundColor: 'blue',
                  color: 'white',
                }}
              >
                {event.title}
              </div>
            )}
          </Draggable>
        ))}
      </div>
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="events">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {events.map((event, index) => eventRender(event.date))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Calendar
        dateCellRender={(date) => <div>{eventRender(date)}</div>}
      />
    </div>
  );
};
export default WaterBooksScheduler;