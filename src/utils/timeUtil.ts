function isWeekday(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  return day >= 1 && day <= 5;
}

function getTimePeriod(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const startTime = 8 * 60; // 8:00 in minutes
  const endTime = 17 * 60; // 17:00 in minutes

  if (currentTime < startTime) {
    return '0:00-8:00';
  } else if (currentTime <= endTime) {
    return '8:00-17:00';
  } else {
    return 'other';
  }
}

function isWorkingHours(): boolean {
  return getTimePeriod() === '8:00-17:00';
}

function isMorningHours(): boolean {
  return getTimePeriod() === '0:00-8:00';
}

export { isWeekday, isWorkingHours, isMorningHours };
