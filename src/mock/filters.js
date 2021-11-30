import dayjs from 'dayjs';
const isFuture = (dueDate) => dueDate && dayjs().isBefore(dueDate, 'D');
const isPointPast = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const pointsToFilterMap = {
  everything: (points) => points.length,
  future: (points) =>  points.filter((point) => isFuture(point.dueDate)).length,
  past: (points) => points.filter((point) => isPointPast(point.dueDate)).length,
};

export const generateFilter = (points) => Object.entries(pointsToFilterMap).map(
  ([filterName, countPoints]) => ({
    name: filterName,
    count: countPoints(points),
  }),
);
