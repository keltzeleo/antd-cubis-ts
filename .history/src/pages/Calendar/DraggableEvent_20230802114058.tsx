import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableEventProps {
  title: string;
}

const DraggableEvent: React.FC<DraggableEventProps> = ({ title }) => {
  const [, drag] = useDrag({
    type: 'EVENT',
    item: { title },
  });

  return (
    <div ref={drag} style={{ cursor: 'move' }}>
      {title}
    </div>
  );
};

export default DraggableEvent;
