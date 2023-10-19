import { useEffect, useState } from "react"
import '../styles/DatePicker.scss';
import { validateInputDate } from "../utils/validators";
import Calendar from "./Calendar";
import moment from "moment";


const DatePicker = () => {
  const [inputDate, setInputDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openCalendar, setOpenCalendar] = useState(false)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setInputDate(e.target.value)
  }

  const openCalendarHandler = () => {
    setOpenCalendar(!openCalendar);
  }

  const onSelectDateHanlder = (date: Date) => {
    setInputDate(moment(date).format("YYYY-MM-DD"))
  }


  useEffect(() => {
    const error = validateInputDate(inputDate);
    setErrorMsg(error);

    if(!error && inputDate !== "") {
      setSelectedDate(moment(inputDate).format("YYYY-MM-DD"))
     }
  
  }, [errorMsg, inputDate])



  return (
    <span className="date-picker">
      <div className={`date-picker-body ${errorMsg ? "error" : ""}`}>
        <i className="bi bi-calendar-week"></i>
        <input 
          className="date-picker-input" 
          type="text" maxLength={10} 
          placeholder="YYYY-MM-DD" 
          value={inputDate} 
          onChange={onChangeHandler} 
          onClick={() => openCalendarHandler()}
        />
      </div>
      {errorMsg && <span className="date-picker-error">{errorMsg}</span>}
     {<Calendar show={openCalendar} date={selectedDate} onSelect={onSelectDateHanlder} />}
    </span>
  )
}

export default DatePicker