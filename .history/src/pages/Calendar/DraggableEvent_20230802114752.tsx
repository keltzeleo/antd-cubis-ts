import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import Draggable from 'react-draggable';

type MyEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

const DraggableEvent: React.FC<EventWrapperProps<MyEvent>> = ({ event }) => {
  return (
    <Draggable
      draggableId={String(event.id)}
      index={0} // Set the appropriate index based on your event order
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            background: '#3174ad',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          {event.title}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableEvent;
