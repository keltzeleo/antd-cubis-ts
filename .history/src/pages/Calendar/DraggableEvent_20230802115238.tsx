import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';

type MyEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  // Add other properties of your event if needed
};

const DraggableEvent: React.FC<EventWrapperProps<MyEvent>> = ({ event }) => {
  return (
    <div>
      {/* Render your draggable event component here */}
      <span>{event.title}</span>
    </div>
  );
};

export default DraggableEvent;
