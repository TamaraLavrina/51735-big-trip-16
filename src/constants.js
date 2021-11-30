const TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const CITY = [
  'Geneva',
  'Chamonix',
  'Amsterdam',
  'Dublin',
  'Lisbon',
  'Berlin',
];

const EVENT_POINT_COUNT = 15;


const OFFERS_TYPES = [
  {
    'type': 'Taxi',
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
    'type': 'Bus',
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
    'type': 'Train',
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
    'type': 'Ship',
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
    'type': 'Drive',
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
    'type': 'Flight',
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
    'type': 'Check-in',
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
    'type': 'Sightseeing',
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
    'type': 'Restaurant',
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
  'Taxi': {
    min: 50,
    max: 100
  },
  'Bus': {
    min: 20,
    max: 50
  },
  'Train': {
    min: 100,
    max: 200
  },
  'Ship': {
    min: 300,
    max: 500
  },
  'Drive': {
    min: 500,
    max: 600
  },
  'Flight': {
    min: 600,
    max: 1000
  },
  'Check-in': {
    min: 0,
    max: 15
  },
  'Sightseeing': {
    min: 5,
    max: 300
  },
  'Restaurant': {
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

export {
  TYPE,
  CITY,
  EVENT_POINT_COUNT,
  POINT_PRICE,
  OFFERS_TYPES,
  DESCRIPTION_CITY,
  MINUTES_IN_DAY,
  HOUR,
};

