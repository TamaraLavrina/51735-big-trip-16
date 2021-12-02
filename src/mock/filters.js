import {isFuture, isPointPast }  from '../utils.js';

const pointsToFilterMap = {
  everything: (points) => points.length,
  future: (points) =>  points.filter((point) => isFuture(point.startDate)).length,
  past: (points) => points.filter((point) => isPointPast(point.startDate)).length,
};

const generateFilter = (points) => Object.entries(pointsToFilterMap).map(
  ([filterName, countPoints]) => ({
    name: filterName,
    count: countPoints(points),
  }),
);

export {generateFilter};
