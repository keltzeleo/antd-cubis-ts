import React, { useState } from 'react';
import { Calendar, Badge } from 'antd';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { mockEvents } from './mockData';

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

  const eventRender = (event: any) => {
    return (
      <Draggable key={event.id} draggableId={event.id} index={events.indexOf(event)}>
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
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="events">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {events.map((event, index) => eventRender(event, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default WaterBooksScheduler;