const EVENT_POINT_COUNT = 20;

const OfferType = {
  TAXI: 'Taxi',
  BUS:'Bus',
  TRAIN:'Train',
  SHIP:'Ship',
  DRIVE:'Drive',
  FLIGHT:'Flight',
  CHECKIN:'Check-in',
  SIGHTSEENING:'Sightseeing',
  RESTARAUNT:'Restaurant'
};

const OFFERS_TYPES = Object.values(OfferType);

const CITY = [
  'Geneva',
  'Chamonix',
  'Amsterdam',
  'Dublin',
  'Lisbon',
  'Berlin',
];

const additionalOffers = [
  {
    'type':  OfferType.TAXI,
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': 2,
        'title': 'Choose the radio station',
        'price': 60
      },
      {
        'id': 3,
        'title': 'Order Uber',
        'price': 20
      },
    ]
  },
  {
    'type':  OfferType.BUS,
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': 2,
        'title': 'Rent mini-bus',
        'price': 500
      }
    ]
  },
  {
    'type': OfferType.TRAIN,
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': 2,
        'title': 'Order breakfast',
        'price': 60
      }
    ]
  },
  {
    'type': OfferType.SHIP,
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': 2,
        'title': 'Order breakfast',
        'price': 60
      }
    ]
  },
  {
    'type': OfferType.DRIVE,
    'offers': [
      {
        'id': 1,
        'title': 'Детское кресло',
        'price': 200
      },
      {
        'id': 2,
        'title': 'Курить в салоне',
        'price': 500
      }
    ]
  },
  {
    'type': OfferType.FLIGHT,
    'offers': [
      {
        'id': 1,
        'title': 'Негабаритный багаж',
        'price': 60
      },
      {
        'id': 2,
        'title': 'Ранее бронирование',
        'price': 60
      }
    ]
  },
  {
    'type': OfferType.CHECKIN,
    'offers': [
      {
        'id': 1,
        'title': 'Check-in online',
        'price': 20
      },
      {
        'id': 2,
        'title': 'Поздний выезд',
        'price': 50
      },
    ]
  },
  {
    'type': OfferType.SIGHTSEENING,
    'offers': [
      {
        'id': 1,
        'title': 'Аудио гид',
        'price': 50
      },
      {
        'id': 2,
        'title': 'Персональный гид',
        'price': 200
      }
    ]
  },
  {
    'type': OfferType.RESTARAUNT,
    'offers': [
      {
        'id': 1,
        'title': 'Забронировать столик',
        'price': 5
      },
      {
        'id': 2,
        'title': 'Специальное меню',
        'price': 10
      }
    ]
  },
];

const POINT_PRICE = {
  [OfferType.TAXI]: {
    min: 50,
    max: 100
  },
  [OfferType.BUS]: {
    min: 20,
    max: 50
  },
  [OfferType.TRAIN]: {
    min: 100,
    max: 200
  },
  [OfferType.SHIP]: {
    min: 300,
    max: 500
  },
  [OfferType.DRIVE]: {
    min: 500,
    max: 600
  },
  [OfferType.FLIGHT]: {
    min: 600,
    max: 1000
  },
  [OfferType.CHECKIN]: {
    min: 0,
    max: 15
  },
  [OfferType.SIGHTSEENING]: {
    min: 5,
    max: 300
  },
  [OfferType.RESTARAUNT]: {
    min: 50,
    max: 150
  },
};

const DESCRIPTION_CITY = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
];

const MINUTES_IN_DAY = 24*60;
const HOUR = 60;

const SortType = {
  DAY: {
    name: 'day',
    disabled: false,
  },
  EVENT: {
    name: 'event',
    disabled: true,
  },
  TIME: {
    name: 'time',
    disabled: false,
  },
  PRICE: {
    name: 'price',
    disabled: false,
  },
  OFFERS: {
    name: 'offers',
    disabled: true,
  },
};

export {
  CITY,
  EVENT_POINT_COUNT,
  POINT_PRICE,
  additionalOffers,
  OFFERS_TYPES,
  DESCRIPTION_CITY,
  MINUTES_IN_DAY,
  HOUR,
  SortType,
};

