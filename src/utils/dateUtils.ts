export const formatRelativeDate = (dateString: string): string => {
  const targetDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (days > 0) {
    if (days === 1) {
      return "через 1 день";
    } else if (days < 5) {
      return `через ${days} дня`;
    } else {
      return `через ${days} дней`;
    }
  } else {
    return "сегодня";
  }
};