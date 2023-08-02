import React from 'react';
import { EventWrapperProps as BigCalendarEventWrapperProps } from 'react-big-calendar';
import DraggableEvent from './DraggableEvent';


type MyEvent = {
    id: string; // Unique identifier for the event
    title: string; // Title of the event
    start: Date; // Start date and time of the event
    end: Date; // End date and time of the event
    type: 'warning' | 'success' | 'error'; // Type of the event (e.g., warning, success, error)
    content: string; // Content or description of the event
  };

type EventWrapperProps = {
  event: MyEvent;
};

const EventWrapper: React.FC<EventWrapperProps> = ({ event }) => {
  return (
    <div>
      <DraggableEvent event={event} />
    </div>
  );
};

export default EventWrapper;
