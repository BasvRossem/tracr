import { useSelector, useDispatch } from 'react-redux';
import { getLogs } from './../../data/logSlice';

export function CurrentDate() {
  const date = useSelector((state: any) => state.currentDate.value);
  const myDate = new Date(date.toString());
  let day: string | number = myDate.getDate();
  let month: string | number = myDate.getMonth() + 1;
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  const year = myDate.getFullYear();

  const dispatch = useDispatch();
  dispatch(getLogs(`${year}-${month}-${day}`));
  return (<h2>{date}</h2>);
}
