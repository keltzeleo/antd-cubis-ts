import { Dayjs } from "dayjs";
import React from "react";

interface SingleRowCalendarProps {
  value: Dayjs;
  selectedDate: Dayjs | null;
  handleDateSelect: (date: Dayjs) => void;
  selectedRightTableColumnDate: Dayjs | null;
  handleRightTableColumnDateChange: (date: Dayjs | null) => void;
  isSingleRowCellDoubleClicked: boolean;
  handleSingleRowCellDoubleClicked: () => void;
}

const SingleRowCalendar: React.FC<SingleRowCalendarProps> = ({
  value,
  selectedDate,
  handleDateSelect,
  selectedRightTableColumnDate,
  handleRightTableColumnDateChange,
  isSingleRowCellDoubleClicked,
  handleSingleRowCellDoubleClicked,
}) => {
  const renderCalendarCell = (date: Dayjs) => {
    const isSelected = selectedDate ? selectedDate.isSame(date, "day") : false;
    const isRightTableColumnDate =
      selectedRightTableColumnDate &&
      selectedRightTableColumnDate.isSame(date, "day");
    const cellClasses = `calendar-cell ${isSelected ? "selected" : ""} ${
      isRightTableColumnDate ? "right-table-column-date" : ""
    }`;

    return (
      <div
        className={cellClasses}
        onClick={() => handleDateSelect(date)}
        onDoubleClick={handleSingleRowCellDoubleClicked}
      >
        <span className="date">{date.format("D")}</span>
        {/* Add more cell content here */}
      </div>
    );
  };

  const renderCalendarHeader = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="calendar-header">
        {daysOfWeek.map((day) => (
          <div key={day} className="header-cell">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderSingleRowCalendar = () => {
    const startOfWeek = value.startOf("week");
    const calendarDays = [];

    for (let i = 0; i < 7; i++) {
      calendarDays.push(startOfWeek.add(i, "day"));
    }

    return (
      <div className="single-row-calendar">
        {renderCalendarHeader()}
        <div className="calendar-row">
          {calendarDays.map((date) => renderCalendarCell(date))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderSingleRowCalendar()}
      {/* Add more JSX content here */}
    </div>
  );
};

export default SingleRowCalendar;
