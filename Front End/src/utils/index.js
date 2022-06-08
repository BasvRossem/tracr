export function toTime(milliseconds) {
  const total = milliseconds / 1000;
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total - (hours * 3600)) / 60);
  return `${hours}h ${minutes}m`; 
}