import { Storage } from '../../data/Storage';

export function CurrentDate() {
  const date = Storage.getInstance().selectedDate.toDateString();
  return (<h2>{date}</h2>);
}
