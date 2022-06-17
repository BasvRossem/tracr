import RCalendar from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from './../../data/dateSlice';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export function Calendar() {
  const date = useSelector((state: any) => state.currentDate.value);
  const dispatch = useDispatch();

  return (
    <RCalendar 
      className="Calendar"
      onChange={(data: Date) => dispatch(setDate(data.toDateString()))}
      value={new Date(date)}
    />
  );
}