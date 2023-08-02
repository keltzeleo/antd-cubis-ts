import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import DraggableEvent, { MyEvent } from './DraggableEvent';

type EventWrapperProps = {
  event: MyEvent;
  children?: React.ReactNode;
};

const EventWrapper: React.FC<EventWrapperProps> = ({ event }) => {
  return (
    <div>
      <DraggableEvent event={event} />
    </div>
  );
};

export default EventWrapper;
