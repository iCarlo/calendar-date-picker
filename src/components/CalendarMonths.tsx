import React from 'react'

interface CalendarMonthsProps {
  months: string[],
  selectedMonth: number,
  onSelectMonthHandler: (month: number) => void
}

const CalendarMonths: React.FC<CalendarMonthsProps> = ({months, selectedMonth, onSelectMonthHandler}) => {

  const onChangeMonthHandler = (month: number) => {
    onSelectMonthHandler(month)
  }

  return (
    <div className="table-content">
          {months.map((month, i) => (
            <div 
              key={i} 
              className={
                `month 
                ${i === selectedMonth ? "selected-month": ""}            
                `
              }
              onClick={() => onChangeMonthHandler(i)}
            >
                <p>{month.slice(0,3)}</p>
            </div>
          ))}
        </div>
  )
}

export default CalendarMonths