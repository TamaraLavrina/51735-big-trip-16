import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import  {CITY, POINT_PRICE, OFFERS_TYPES, DESCRIPTION_CITY, PICTURES_CITY, additionalOffers } from '../constants.js';
import { getRandomInteger } from '../utils.js';


const generateTypePoint = (type) => {
  const randomIndex = getRandomInteger(0, type.length - 1);
  return type[randomIndex];
};

const generateDestination = (city) => {
  const randomIndex = getRandomInteger(0, city.length - 1);
  return city[randomIndex];
};

const generateDescription = (descriptionCity) => {
  const randomIndex = getRandomInteger(0, descriptionCity.length - 1);
  return descriptionCity[randomIndex];
};

const generatePicDescription = (descriptionPic) => {
  const randomIndex = getRandomInteger(0, descriptionPic.length - 1);
  return descriptionPic[randomIndex];
};

const generateRandomPrice = (type) => getRandomInteger(POINT_PRICE[type].min, POINT_PRICE[type].max);

const getRandomPhotos = () => {
  const photos = [];
  const randomCount = getRandomInteger(0, 5);
  for (let i = 0; i < randomCount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${getRandomInteger(0, 1000)}`);
  }
  return photos;
};

const generateDate = () => {
  const randomInterval = getRandomInteger(15, 43200);
  const randomDuration = getRandomInteger(15, 360);

  return {
    startDate: dayjs().add(randomInterval, 'minute').toDate(),
    endDate: dayjs().add(randomInterval + randomDuration, 'minute').toDate(),
  };
};

const generatePoint = () => {
  const type = generateTypePoint(OFFERS_TYPES);
  const destination = generateDestination(CITY);
  const date = generateDate();
  return {
    id: nanoid(),
    type: type,
    destination: {
      description: generateDescription(DESCRIPTION_CITY),
      name: destination,
      pictures: [
        {
          src: getRandomPhotos(),
          description: generatePicDescription(PICTURES_CITY),
        },
      ],
    },
    basePrice: generateRandomPrice(type),
    startDate: date.startDate,
    finishDate: date.endDate,
    offers: (additionalOffers.find((el) => el.type === type)).offers,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

const generateBlanckPoint = ()=> {
  const type = generateTypePoint(OFFERS_TYPES);
  const destination = generateDestination(CITY);
  const date = generateDate();
  return {
    id: nanoid(),
    type: type,
    destination: {
      description: generateDescription(DESCRIPTION_CITY),
      name: destination,
      pictures: [
        {
          src: getRandomPhotos(),
          description: generatePicDescription(PICTURES_CITY),
        },
      ],
    },
    description: generateDescription(DESCRIPTION_CITY),
    basePrice: generateRandomPrice(type),
    startDate: date.startDate,
    finishDate: date.endDate,
    offers: (additionalOffers.find((el) => el.type === type)).offers,
    isFavorite: false,
  };
};

const BLANK_POINT = generateBlanckPoint();

export {
  generatePoint,
  getRandomPhotos,
  generateDescription,
  BLANK_POINT,
  generatePicDescription,
  generateTypePoint,
  PICTURES_CITY,
};


