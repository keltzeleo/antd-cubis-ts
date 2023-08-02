import React from 'react';
import { EventWrapperProps as MyEventWrapperProps } from 'react-big-calendar'; // Rename the import
import DraggableEvent from './DraggableEvent';

type MyEvent = {
  id: number;
  // Add other properties of your event if needed
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
