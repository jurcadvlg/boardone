export function isWinterSeason(date: Date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  if ((month == 11 && day >= 1) || month == 12 || month == 1 || month == 2 || (month == 3 && day <= 31)) {
    return true;
  }
  return false;
}
