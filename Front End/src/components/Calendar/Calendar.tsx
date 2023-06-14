import RCalendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

import { logApiDate } from '../../utils/time';
import { storage } from '../../data/Storage';

import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export function Calendar() {
  const navigate = useNavigate();
  const date = storage.selectedDate;

  const changeDate = (newDate: Date) => {
    navigate(`../logs/${logApiDate(newDate)}`, {replace: true});
  };

  return (
    <RCalendar 
      className="Calendar"
      onChange={(newDate: Date) => changeDate(newDate)}
      value={new Date(date)}
    />
  );
}