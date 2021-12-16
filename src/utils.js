import dayjs from 'dayjs';
import { HOUR, MINUTES_IN_DAY } from './constants.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const isFuture = (startDate) => dayjs(startDate).isAfter(dayjs(), 'D');
const isPointPast = (startDate) => dayjs(startDate).isBefore(dayjs(), 'D');

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const countDuration = (start, finish) => {
  const durationInMinutes = dayjs(finish).diff(dayjs(start), 'minute');

  if(durationInMinutes < HOUR) {
    return `${dayjs.duration(durationInMinutes, 'minute').format('mm')}M`;
  }

  if(durationInMinutes >= HOUR && durationInMinutes < MINUTES_IN_DAY) {
    return `${dayjs.duration(durationInMinutes, 'minute').format('HH')}H ${dayjs.duration(durationInMinutes, 'minute').format('mm')}M`;
  }

  return `${dayjs.duration(durationInMinutes, 'minute').format('DD')}D
          ${dayjs.duration(durationInMinutes, 'minute').format('HH')}H
          ${dayjs.duration(durationInMinutes, 'minute').format('mm')}M`;
};

const getDiffTimePoint = (startDate, finishDate) => dayjs(finishDate).diff(dayjs(startDate));


const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
const sortPointTime = (pointA, pointB) => getDiffTimePoint(pointB.startDate, pointB.finishDate) - getDiffTimePoint(pointA.startDate, pointA.finishDate);
const sortPointDay = (pointA, pointB) => pointA.finishDate - pointB.startDate;

export {getRandomInteger,
  isFuture,
  isPointPast,
  updateItem,
  sortPointPrice,
  sortPointDay,
  sortPointTime,
  countDuration
};
