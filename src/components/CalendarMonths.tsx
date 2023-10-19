import React from 'react'

interface CalendarMonthsProps {
  months: string[],
  selectedDate: Date,
  onSelectMonthHandler: (month: number) => void
  onSelectCalendarControlHandler: (index: number) => void
}

const CalendarMonths: React.FC<CalendarMonthsProps> = ({months, selectedDate, onSelectMonthHandler, onSelectCalendarControlHandler}) => {

  const onChangeMonthHandler = (month: number) => {
    onSelectMonthHandler(month)
  }

  return (
    <>
      <div className="calendar-controls">
        <span><i className="bi bi-chevron-left"></i></span>
        <button onClick={() => onSelectCalendarControlHandler(2)} className='calendar-controls-btn'>
           {selectedDate.getFullYear()}
        </button>
        <span><i className="bi bi-chevron-right"></i></span>
      </div>

      <div className="calendar-months-body">
        <div className="months-content">
          {months.map((month, i) => (
            <div 
              key={i} 
              className={
                `month 
                ${i === selectedDate.getMonth() ? "selected-month": ""}            
                `
              }
              onClick={() => onChangeMonthHandler(i)}
            >
                <span>{month.slice(0,3)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CalendarMonths