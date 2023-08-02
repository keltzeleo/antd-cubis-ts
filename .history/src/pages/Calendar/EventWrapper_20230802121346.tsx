import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import DraggableEvent from './DraggableEvent';
import { MyEvent } from './MyEvent';

const EventWrapper: React.FC<EventWrapperProps<MyEvent>> = ({ event }) => {
  return (
    <div>
      <DraggableEvent event={event} />
    </div>
  );
};

export default EventWrapper;
