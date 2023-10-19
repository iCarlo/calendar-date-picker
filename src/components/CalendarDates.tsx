import React, { useEffect, useState } from 'react'
import { generateDatesData } from '../utils/helpers';

interface CalendarDatesProps {
  months: string[],
  selectedDate: Date,
  onSelectDateHandler: (date: Date) => void
  onSelectCalendarControlHandler: (index: number) => void
}

const CalendarDates: React.FC<CalendarDatesProps> = ({
  months,
  selectedDate, 
  onSelectDateHandler,
  onSelectCalendarControlHandler
}) => {

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const [currentMonthSlide, setCurrentMonthSlide] = useState(0);

  const prevSlide = () => {
    setCurrentMonthSlide(currentMonthSlide === 0 ? 0 : (prev) => prev - 1)
  }
  const nextSlide = () => {
    setCurrentMonthSlide(currentMonthSlide === 11 ? 11 : (prev) => prev + 1)
  }
  

  useEffect(() => {
    setCurrentMonthSlide(selectedDate.getMonth())
  }, [selectedDate])
  

  return (
    <>
      <div className="calendar-controls">
        <span onClick={() => prevSlide()}><i className="bi bi-chevron-left"></i></span>
        <button onClick={() => onSelectCalendarControlHandler(1)} className='calendar-controls-btn'>
          {months[currentMonthSlide]} {selectedDate.getFullYear() }
        </button>
        <span onClick={() => nextSlide()}><i className="bi bi-chevron-right"></i></span>
      </div>

      <div className="calendar-body">
        {months.map((month, i) => (
          <div key={i} className="calendar-month" style={{transform: `translateX(-${currentMonthSlide * 350}px)`}}>
              <div className="table-header">
                {weekDays.map((weekday, i) => (
                  <div className='weekday' key={i}><p>{weekday}</p></div>
                ))}
              </div>

              <div className="table-content">
                {generateDatesData(month, selectedDate, i).map((date, i) => (
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
                      <span>{date.date.getDate()}</span>
                  </div>
                ))}
              </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CalendarDates