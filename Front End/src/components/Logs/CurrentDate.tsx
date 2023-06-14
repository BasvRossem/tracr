import { storage } from '../../data/Storage';

export function CurrentDate() {
  const date = storage.selectedDate.toDateString();
  return (<h2>{date}</h2>);
}
