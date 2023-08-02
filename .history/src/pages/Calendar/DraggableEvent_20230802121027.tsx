import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';

type MyEvent = {
    id: string; // Unique identifier for the event
    title: string; // Title of the event
    start: Date; // Start date and time of the event
    end: Date; // End date and time of the event
    type: 'warning' | 'success' | 'error'; // Type of the event (e.g., warning, success, error)
    content: string; // Content or description of the event
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
