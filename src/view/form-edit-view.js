import { CITY, OFFERS_TYPES, DESCRIPTION_CITY, PICTURES_CITY } from '../constants.js';
import {generateDescription, generatePicDescription, getRandomPhotos } from '../mock/trip-point.js';
import { BLANK_POINT } from '../mock/trip-point.js';
import SmartView from './smart-view.js';

const createAdditionalOffer = (offers, ) => {
  if (offers.length) {
    return `<div class="event__available-offers">
    ${offers.map(({title, id, price}) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" checked>
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`).join('')}
    </div>`;
  }
  return '';
};

const createCityList = () => (
  CITY.map((city) => (
    `<option value="${city}"></option>`
  )).join('')
);

const createDestinationalPhoto = (photos) => (
  `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${photos.map(({src, description}) => `<img class="event__photo" src="${src}" alt="${description}">`)}
  </div>
</div>`
);

const createTypeList = () => (
  OFFERS_TYPES.map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-taxi-1">${type}</label>
    </div>`
  )).join('')
);

const createFormEditTemplate = (data) => {
  const {type, basePrice, startDate, finishDate, destination, offers} = data;
  const offersTemplate = createAdditionalOffer(offers);
  const cityList = createCityList();
  const typesList = createTypeList();
  const destinationPhotos = createDestinationalPhoto(destination.pictures);
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
            ${typesList}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${cityList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishDate}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">${basePrice}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${offersTemplate}</div></section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">${destination.name}</h3>
          <p class="event__destination-description">${destination.description}</p>
          ${destinationPhotos}
        </section>
  </section>
  </form>
</li>`;
};

class FormEditView extends SmartView{
  constructor(point = BLANK_POINT) {
    super();
    this._data = FormEditView.parsePointToData(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._data);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollUpClickHandler(this._callback.rollUpClickHandler);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormEditView.parseDataToPoint(this._data));
  }

  setRollUpClickHandler = (callback) => {
    this._callback.rollUpClickHandler = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
  }

  #rollUpClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollUpClickHandler();
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__type-input')
      .addEventListener('change', this.#cityChangeHandler);
  }

  #typeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      // console.log(evt.target.value);
      this.updateData({
        type: evt.target.value,
        // offer: создать доступные оферы,
      });
    }
  }

  #cityChangeHandler = (evt) => {
    if(evt.target.tagName === 'INPUT') {
      evt.preventDefault();
      this.updateData({
        destination: {
          description: generateDescription(DESCRIPTION_CITY),
          name: evt.target.value,
          pictures: [{
            src: getRandomPhotos(),
            description: generatePicDescription(PICTURES_CITY),
          }],
        }
      });
    }
  }

  reset = (point) => {
    this.updateData(
      FormEditView.parsePointToData(point),
    );
  }

  static parsePointToData = (point) => Object.assign(point)


  static parseDataToPoint = (data) => {
    const point = {...data};
    return point;
  }
}


export default FormEditView;
