import React from 'react';
import { useDrag } from 'react-dnd';
import { Event } from 'react-big-calendar';

interface DraggableEventProps {
  event: Event;
}

const DraggableEvent: React.FC<DraggableEventProps> = ({ event }) => {
  const [, drag] = useDrag({
    type: 'EVENT',
    item: { event },
  });

  return (
    <div ref={drag} style={{ cursor: 'move' }}>
      {event.title}
    </div>
  );
};

export default DraggableEvent;
