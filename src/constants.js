const EVENT_POINT_COUNT = 3;
const SHAKE_ANIMATION_TIMEOUT = 600;
const MINUTES_IN_DAY = 24*60;
const HOUR = 60;
const AUTHORIZATION = 'Basic hzxcvzna2555j';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip/';

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
};

export {
  EVENT_POINT_COUNT,
  MINUTES_IN_DAY,
  HOUR,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem,
  SHAKE_ANIMATION_TIMEOUT,
  AUTHORIZATION,
  END_POINT
};

