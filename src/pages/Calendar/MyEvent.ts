// MyEvent.ts
export interface MyEvent {
    id: string; // Unique identifier for the event
    title: string; // Title of the event
    start: Date; // Start date and time of the event
    end: Date; // End date and time of the event
    type: 'warning' | 'success' | 'error'; // Type of the event (e.g., warning, success, error)
    content: string; // Content or description of the event
  }
  