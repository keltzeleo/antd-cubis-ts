import DraggableEvent, { MyEvent } from './DraggableEvent';


type EventWrapperProps = {
    event: MyEvent;
    className?: string;
    isRtl?: boolean;
    getters?: any;
    onClick?: any;
    ... // Include other required props if necessary
  };
  
  const EventWrapper: React.FC<EventWrapperProps> = ({ event }) => {
    return (
      <div>
        <DraggableEvent event={event} />
      </div>
    );
  };
  
