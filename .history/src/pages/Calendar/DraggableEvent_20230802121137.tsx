import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';

const DraggableEvent: React.FC<EventWrapperProps<MyEvent>> = ({ event }) => {
  // Implement your component logic here...
  return <div>{event.title}</div>; // For example, rendering the event title
};

export default DraggableEvent;
