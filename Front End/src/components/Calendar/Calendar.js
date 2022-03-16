import { Calendar as RCalendar } from 'react-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { setDate } from './../../data/dateSlice';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export function Calendar() {
  const date = useSelector((state) => state.currentDate.value);
  const dispatch = useDispatch();

  return (
    <RCalendar 
      class="Calendar"
      onChange={(data) => dispatch(setDate(data.toDateString()))}
      value={new Date(date)}
    />
  );
}