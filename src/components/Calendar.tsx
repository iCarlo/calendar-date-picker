import { useEffect, useState } from 'react';
import '../styles/Calendar.scss';
import CalendarDates from './CalendarDates';
import CalendarMonths from './CalendarMonths';
import CalendarYears from './CalendarYears';

interface CalendarProps {
  date?: Date | string | null,
  onSelect: (date: Date) => void,
  show: boolean,
}

const Calendar: React.FC<CalendarProps> = ({date,show, onSelect}) => {
  
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

  const [currentCalendarControl, setCurrentCalendarControl] = useState(0);
  const [currentMonthSlide, setCurrentMonthSlide] = useState(0);
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
  }, [])

  useEffect(() => {
    setCurrentMonthSlide(selectedDate.getMonth())
  }, [selectedDate])
  


  const prevSlide = () => {
    setCurrentMonthSlide(currentMonthSlide === 0 ? 0 : (prev) => prev - 1)
  }
  const nextSlide = () => {
    setCurrentMonthSlide(currentMonthSlide === 11 ? 11 : (prev) => prev + 1)
  }

  const onSelectDateHandler = (date: Date) => {
    onSelect(date);
    setSelectedDate(date);
  }

  const onSelectMonthHandler = (month: number) => {
    const newDate = (new Date(selectedDate));
    newDate.setMonth(month);
    setSelectedDate(newDate);
    onSelect(newDate);
    // setCurrentCalendarControl(0);
  }

  const renderCalendarControls = () => {
    switch (currentCalendarControl) {
      case 0:      
        return `${months[currentMonthSlide]} ${selectedDate.getFullYear()}`;
    
      case 1:      
        return selectedDate.getFullYear();
      
      case 2:      
        return "2010-2019";

      default:
        return `${months[currentMonthSlide]} ${selectedDate.getFullYear()}`;
    }
  }

  const renderCalendarContent = (month: string) => {
    switch (currentCalendarControl) {
      case 0:      
        return (
          <CalendarDates 
              month={month} 
              monthIndex={ months.indexOf(month)} 
              selectedDate={selectedDate} 
              onSelectDateHandler={onSelectDateHandler} 
            />
        );
    
      case 1:      
        return (
          <CalendarMonths
            months={months} 
            selectedMonth={selectedDate.getMonth()} 
            onSelectMonthHandler={onSelectMonthHandler} 
          />
        );
      
      case 2:      
        return (
          <CalendarYears />
        );

      default:
        return (
          <CalendarDates 
              month={month} 
              monthIndex={ months.indexOf(month)} 
              selectedDate={selectedDate} 
              onSelectDateHandler={onSelectDateHandler} 
            />
        );
    }
  }


  return (
    <div className="calendar" style={{display: `${show ? "block": "none"}`}}>
      <div className="calendar-controls">
        <span onClick={() => prevSlide()}><i className="bi bi-chevron-left"></i></span>
        <button onClick={() => setCurrentCalendarControl((prev) => prev === 2 ? 2 : prev + 1)} className='calendar-controls-btn'>
          { renderCalendarControls() }
        </button>
        <span onClick={() => nextSlide()}><i className="bi bi-chevron-right"></i></span>
      </div>

      <div className="calendar-body">
        {months.map((month, i) => (
          <div key={i} className="calendar-month" style={{transform: `translateX(-${currentMonthSlide * 300}px)`}}>
              {renderCalendarContent(month)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
