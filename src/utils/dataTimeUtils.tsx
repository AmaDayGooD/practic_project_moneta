const isTwoWeeksPassed = (date: string): boolean => {
  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) {
    console.warn('Неверный формат даты:', date);
    return false;
  }

  const now = new Date();
  const diffMs = now.getTime() - inputDate.getTime();
  const twoWeeksInMs = 1000 * 60 * 60 * 24 * 14;
  return diffMs >= twoWeeksInMs;
};

export default isTwoWeeksPassed;