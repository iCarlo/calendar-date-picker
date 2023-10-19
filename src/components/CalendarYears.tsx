import React, { useEffect, useState } from 'react'
import { generateYearsData } from '../utils/helpers'
import moment from 'moment'

interface CalendarYearsProps {
  selectedDate: Date,
  onSelectYearHandler: (year: number) => void,
  onSelectCalendarControlHandler: (index: number) => void
}

const CalendarYears:React.FC<CalendarYearsProps> = ({selectedDate, onSelectYearHandler, onSelectCalendarControlHandler}) => {
  const [yearOptions, setYearOptions] = useState<number[] | []>([])
  const [tempDate, setTempDate] = useState(selectedDate)
 
  useEffect(() => {
    setTempDate(selectedDate)
    
  }, [selectedDate])

  useEffect(() => {
    setYearOptions(generateYearsData(tempDate.getFullYear()))

  }, [tempDate])


  const prevSlide = () => {
    const tempYear = (new Date(tempDate));
    const newDate = moment(tempYear).add(-10, "years").toDate();
    setTempDate(newDate);
  }
  const nextSlide = () => {
    const tempYear = (new Date(tempDate));
    const newDate = moment(tempYear).add(10, "years").toDate();
    setTempDate(newDate);
  }
  
  return (
    <>
      <div className="calendar-controls">
        <span onClick={() => prevSlide()}><i className="bi bi-chevron-left"></i></span>
        <button onClick={() => onSelectCalendarControlHandler(0)} className='calendar-controls-btn'>
           {`${yearOptions[1]}-${yearOptions[10]}`}
        </button>
        <span onClick={() => nextSlide()}><i className="bi bi-chevron-right"></i></span>
      </div>

      <div className="calendar-years-body">
        <div className="years-content">
          {yearOptions.map((year, i) => (
            <div 
              key={i} 
              className={
                `year 
                ${year === selectedDate.getFullYear() ? "selected-year": ""}            
                ${i !== 0 && i !== 11 ? "active-year": ""}            
                `
              }
              onClick={() => onSelectYearHandler(year)}
            >
                <span>{year}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CalendarYears