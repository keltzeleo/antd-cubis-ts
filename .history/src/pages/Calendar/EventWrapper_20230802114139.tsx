import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import DraggableEvent from './DraggableEvent';

interface MyEvent {
  title: string;
}

const EventWrapper: React.FC<EventWrapperProps<MyEvent>> = ({ event }) => {
  return (
    <div>
      <DraggableEvent title={event.title} />
    </div>
  );
};

export default EventWrapper;
