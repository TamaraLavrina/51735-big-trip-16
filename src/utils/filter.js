import { FilterType } from '../constants.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.startDate >= dayjs().toDate()),
  [FilterType.PAST]: (points) => points.filter((point) => point.finishDate < dayjs().toDate()),
};

export {filter};
