import React from 'react'
import { generateDatesData } from '../utils/helpers';

interface CalendarDatesProps {
  month: string,
  monthIndex: number,
  selectedDate: Date,
  onSelectDateHandler: (date: Date) => void
}

const CalendarDates: React.FC<CalendarDatesProps> = ({monthIndex, month, selectedDate, onSelectDateHandler}) => {
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <>
      <div className="table-header">
          {weekDays.map((weekday, i) => (
            <div className='weekday' key={i}><p>{weekday}</p></div>
          ))}
        </div>

        <div className="table-content">
          {generateDatesData(month, selectedDate, monthIndex).map((date, i) => (
            <div 
              key={`${month}-${i}`} 
              className={
                `date 
                ${date.isCurrentDate ? "current-date": ""}
                ${date.isCurrentMonth ? "current-month" : ""}
                ${date.isSelectedDate ? "selected-date" : ""}                
                `
              }
              onClick={() => onSelectDateHandler(date.date)}
            >
                <p>{date.date.getDate()}</p>
            </div>
          ))}
        </div>
    </>
  )
}

export default CalendarDates