export function formatTime(decimalHours: number) {
  const days = Math.floor(decimalHours / 24);
  const hours = Math.floor(decimalHours % 24);
  const minutes = Math.round((decimalHours % 1) * 60);

  let result = '';

  if (days > 0) {
    result += `${days}d `;
  }
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0 || result === '') {
    result += `${minutes}m`;
  }

  return result.trim();
}
