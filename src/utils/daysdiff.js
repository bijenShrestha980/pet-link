export const diffDays = (date, otherDate) =>
  365 - Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
