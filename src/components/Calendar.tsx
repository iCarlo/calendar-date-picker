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
  const [selectedDate, setSelectedDate] = useState<Date>((new Date()));


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
  


  const onSelectDateHandler = (date: Date) => {
    onSelect(date);
    setSelectedDate(date);
  }

  const onSelectMonthHandler = (month: number) => {
    const newDate = (new Date(selectedDate));
    newDate.setMonth(month);
    setSelectedDate(newDate);
    onSelect(newDate);
    setCurrentCalendarControl(2);
  }

  const onSelectYearHandler = (year: number) => {
    const newDate = (new Date(selectedDate));
    newDate.setFullYear(year);
    setSelectedDate(newDate);
    onSelect(newDate);
    setCurrentCalendarControl(0);
  }


  const renderCalendarContent = () => {
    switch (currentCalendarControl) {
      case 0:      
        return (
          <CalendarDates 
              months={months}
              selectedDate={selectedDate} 
              onSelectDateHandler={onSelectDateHandler} 
              onSelectCalendarControlHandler={setCurrentCalendarControl}
            />
        );
    
      case 1:      
        return (
          <CalendarMonths
            months={months} 
            selectedDate={selectedDate} 
            onSelectMonthHandler={onSelectMonthHandler} 
            onSelectCalendarControlHandler={setCurrentCalendarControl}
          />
        );
      
      case 2:      
        return (
          <CalendarYears
            selectedDate={selectedDate} 
            onSelectYearHandler={onSelectYearHandler}
            onSelectCalendarControlHandler={setCurrentCalendarControl}
          />
        );
    }
  }


  return (
    <div className="calendar" style={{display: `${show ? "block": "none"}`}}>
      {renderCalendarContent()}
    </div>
  )
}

export default Calendar
