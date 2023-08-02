import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import DraggableEvent from './DraggableEvent';

const EventWrapper: React.FC<EventWrapperProps<Event>> = ({ event, children }) => {
  return (
    <div>
      <DraggableEvent event={event} />
      {children}
    </div>
  );
};

export default EventWrapper;
