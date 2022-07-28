import RCalendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from './../../data/dateSlice';
import { getLogs } from './../../data/logSlice';
import { logApiDate } from '../../utils/time';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export function Calendar() {
  const dispatch = useDispatch();
  const date = useSelector((state: any) => state.currentDate.value);

  const changeDate = (newDate: Date) => {
    dispatch(setDate(newDate.toDateString()));
    dispatch(getLogs(logApiDate(newDate)));
  };

  return (
    <RCalendar 
      className="Calendar"
      onChange={(newDate: Date) => changeDate(newDate)}
      value={new Date(date)}
    />
  );
}