import DraggableEvent, { MyEvent } from './DraggableEvent';
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
