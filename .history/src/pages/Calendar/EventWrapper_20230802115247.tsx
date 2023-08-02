import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import DraggableEvent from './DraggableEvent';

type MyEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
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
