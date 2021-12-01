import dayjs from 'dayjs';
const isFuture = (startDate) => dayjs(startDate).isAfter(dayjs(), 'D');
const isPointPast = (startDate) => dayjs(startDate).isBefore(dayjs(), 'D');

const pointsToFilterMap = {
  everything: (points) => points.length,
  future: (points) =>  points.filter((point) => isFuture(point.startDate)).length,
  past: (points) => points.filter((point) => isPointPast(point.startDate)).length,
};

export const generateFilter = (points) => Object.entries(pointsToFilterMap).map(
  ([filterName, countPoints]) => ({
    name: filterName,
    count: countPoints(points),
  }),
);
