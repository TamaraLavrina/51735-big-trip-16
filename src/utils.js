import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const isFuture = (startDate) => dayjs(startDate).isAfter(dayjs(), 'D');
const isPointPast = (startDate) => dayjs(startDate).isBefore(dayjs(), 'D');

export {getRandomInteger,
  isFuture,
  isPointPast,
};
