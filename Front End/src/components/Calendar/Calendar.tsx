import RCalendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from './../../data/dateSlice';
import { getLogs } from './../../data/logSlice';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export function Calendar() {
  const dispatch = useDispatch();
  const date = useSelector((state: any) => state.currentDate.value);

  const changeDate = (newDate: Date) => {
    dispatch(setDate(newDate.toDateString()));

    const day   = ("0" + (newDate.getDate())).slice(-2);
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const year  = newDate.getFullYear();
    dispatch(getLogs(`${year}-${month}-${day}`));
  };

  return (
    <RCalendar 
      className="Calendar"
      onChange={(newDate: Date) => changeDate(newDate)}
      value={new Date(date)}
    />
  );
}