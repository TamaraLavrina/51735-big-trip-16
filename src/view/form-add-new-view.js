import dayjs from 'dayjs';
import {getRandomPhotos}  from '../mock/trip-point.js';
import {OFFERS_TYPES} from '../constants.js';
// import AbstractView from './abstract-view.js';

const photos = getRandomPhotos();
const createPhotoTemplate = (pics) => pics.map((pic) => `<img class="event__photo" src="${pic}" alt="Event photo">`).join('');
// const createOffersTemplate = (additionalOffers) => {
//   additionalOffers.map(({offers}) => `<div class="event__offer-selector">
//     <input class="event__offer-checkbox  visually-hidden" id="event-offer-${additionalOffers.type}-${additionalOffers.offers.id}" type="checkbox" name="event-offer-${additionalOfferss.type}" checked>
//     <label class="event__offer-label" for="event-offer-${additionalOffers.type}-${additionalOffers.offers.id}">
//       <span class="event__offer-title">${additionalOffers.offers.title}</span>
//       &plus;&euro;&nbsp;
//       <span class="event__offer-price">${additionalOffers.offers.price}</span>
//     </label>
//   </div>`);
// };

const createEventTypeList = () => (
  OFFERS_TYPES.map((typeEvent) => (
    `<div class="event__type-item">
      <input id="event-type-${typeEvent.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeEvent.toLowerCase()}">
      <label class="event__type-label  event__type-label--${typeEvent.toLowerCase()}" for="event-type-taxi-1">${typeEvent}</label>
    </div>`
  )).join('')
);

const createFormAddNewPointTemplate = (point = {}) => {
  const {
    destination = '',
    startDate = 0,
    finishDate = 0,
    price = 0,
    type = '',
    description = '',
  } = point;

  const finishDay = dayjs(finishDate).format('YYYY-MM-DDTHH:mm');
  const startDay = dayjs(startDate).format('YYYY-MM-DDTHH:mm');
  const photosTemplate = createPhotoTemplate(photos);
  // const offersTemplate = createOffersTemplate(additionalOffers);
  const eventTypeList = createEventTypeList(OFFERS_TYPES);
  return  `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${eventTypeList}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDay}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishDay}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
  </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosTemplate}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>`;
};

export { createFormAddNewPointTemplate};
