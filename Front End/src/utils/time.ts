export function toTimeString(milliseconds: number): string  {
  const total = milliseconds / 1000;
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total - (hours * 3600)) / 60);
  return `${hours}h ${minutes}m`; 
}

export function formatDateToHourMinute(date) {
  const hour = new Date(date).getHours();
  const hourString = hour < 10 ? `0${hour}` : hour;
  const minutes = new Date(date).getMinutes();
  const minuteString = minutes < 10 ? `0${minutes}` : minutes;

  return `${hourString}:${minuteString}`;
}

export function logApiDate(date: Date) {
  const day   = ("0" + (date.getDate())).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year  = date.getFullYear();
  return `${year}-${month}-${day}`;
}