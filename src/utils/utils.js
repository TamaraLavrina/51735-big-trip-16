import dayjs from 'dayjs';
import { HOUR, MINUTES_IN_DAY, CITY, DESCRIPTION_CITY, PICTURES_CITY, } from '../constants.js';

// import {, POINT_PRICE, OFFERS_TYPES,  additionalOffers } from '../constants.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const isFuture = (startDate) => dayjs(startDate).isAfter(dayjs(), 'D');
const isPointPast = (startDate) => dayjs(startDate).isBefore(dayjs(), 'D');

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

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);

const generateDate = () => {
  const randomInterval = getRandomInteger(-2880, 2880);
  const randomDuration = getRandomInteger(15, 360);

  return {
    startDate: dayjs().add(randomInterval, 'minute').toDate(),
    endDate: dayjs().add(randomInterval + randomDuration, 'minute').toDate(),
  };
};

const generateDescription = (descriptionCity) => {
  const randomIndex = getRandomInteger(0, descriptionCity.length - 1);
  return descriptionCity[randomIndex];
};

const getRandomPhotos = () => {
  const photos = [];
  const randomCount = getRandomInteger(0, 5);
  for (let i = 0; i < randomCount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`);
  }
  return photos;
};

const generatePicDescription = (descriptionPic) => {
  const randomIndex = getRandomInteger(0, descriptionPic.length - 1);
  return descriptionPic[randomIndex];
};

const destinations = CITY.map((el) => ({
  description: generateDescription(DESCRIPTION_CITY),
  name: el,
  pictures: [
    {
      src: getRandomPhotos(),
      description: generatePicDescription(PICTURES_CITY),
    },
  ],
}));


const dateBlank = generateDate();

const BLANK_POINT = {
  basePrice: 1100,
  startDate: dateBlank.startDate,
  finishDate: dateBlank.endDate,
  destination: {
    description: 'Description of New City',
    name: 'Paris',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ],
  },
  id: 80,
  isFavorite: false,
  type: 'flight',
  offers: [],
};


export {getRandomInteger,
  isFuture,
  isPointPast,
  sortPointPrice,
  sortPointDay,
  sortPointTime,
  countDuration,
  capitalizeFirstLetter,
  generateDate,
  destinations,
  dateBlank,
  BLANK_POINT
};
