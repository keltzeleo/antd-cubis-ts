import dayjs from "dayjs";

interface SingleRowCalendarProps {
  currentMonth: string;
}

const SingleRowCalendar = ({ currentMonth }: SingleRowCalendarProps) => {
  // Get the number of days in the current month
  const daysInMonth = dayjs(currentMonth).daysInMonth();

  // Generate an array of day numbers
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

export default SingleRowCalendar;
