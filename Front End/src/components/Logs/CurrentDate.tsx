import { useSelector } from 'react-redux';

export function CurrentDate() {
  const date = useSelector((state: any) => state.currentDate.value);
  return (<h2>{date}</h2>);
}
