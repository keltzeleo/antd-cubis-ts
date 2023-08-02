import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import DraggableEvent from './DraggableEvent';

const EventWrapper: React.FC<EventWrapperProps<{ title: string }>> = ({ event, children }) => {
  return (
    <div>
      <DraggableEvent title={event.title} />
      {children}
    </div>
  );
};

export default EventWrapper;
