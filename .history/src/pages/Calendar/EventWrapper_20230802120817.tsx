import React from 'react';
import { EventWrapper as BigCalendarEventWrapperProps } from 'react-big-calendar'; // Renamed the imported type
import DraggableEvent from './DraggableEvent';

type MyEvent = {
  // Your event type definition
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
