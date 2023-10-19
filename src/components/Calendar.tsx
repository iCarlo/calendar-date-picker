import { useEffect, useState } from 'react';
import '../styles/Calendar.scss';
import {  generateDatesData } from '../utils/helpers';

interface CalendarProps {
  date?: Date | string | null,
  onSelect: (date: Date) => void,
  show: boolean,
}

const Calendar: React.FC<CalendarProps> = ({date,show, onSelect}) => {
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]


  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>((new Date()))


  useEffect(() => {
    if(date instanceof Date) {
      setSelectedDate(date)

    } else if (typeof date === 'string' && date !== ""){
      setSelectedDate((new Date(date)))

    } else {
      setSelectedDate((new Date()))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  useEffect(() => {
    setCurrentSlide(selectedDate.getMonth())
  }, [selectedDate])
  


  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 0 : (prev) => prev - 1)
  }
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 11 ? 11 : (prev) => prev + 1)
  }

  const onSelectDateHandler = (date: Date) => {
    console.log(date);
    onSelect(date);
    setSelectedDate(date);
  }
  
  
  return (
    <div className="calendar" style={{display: `${show ? "block": "none"}`}}>
      <div className="calendar-controls">
        <span onClick={() => prevSlide()}><i className="bi bi-chevron-left"></i></span>
        <button className='calendar-controls-btn'>{months[currentSlide]} {selectedDate.getFullYear()}</button>
        <span onClick={() => nextSlide()}><i className="bi bi-chevron-right"></i></span>
      </div>

      <div className="calendar-body">
        {months.map((month, i) => (
          <div key={i} className="calendar-month" style={{transform: `translateX(-${currentSlide * 300}px)`}}>
            

            <div className="table-header">
              {weekDays.map((weekday, i) => (
                <div className='weekday' key={i}><p>{weekday}</p></div>
              ))}
            </div>

            <div className="table-content">
              {generateDatesData(month, selectedDate, months.indexOf(month)).map((date, i) => (
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
