import { CITY, OFFERS_TYPES, DESCRIPTION_CITY, PICTURES_CITY, additionalOffers } from '../constants.js';
import {generateDescription, generatePicDescription, getRandomPhotos } from '../mock/trip-point.js';
import { BLANK_POINT } from '../mock/trip-point.js';
import SmartView from './smart-view.js';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';


const createAdditionalOffer = (offers) => {
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
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}">${type}</label>
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

class FormEditView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point = BLANK_POINT) {
    super();
    this._data = FormEditView.parsePointToData(point);
    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createFormEditTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }


    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }


  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollUpClickHandler(this._callback.rollUpClickHandler);
    this.setDeleteClickHandler(this._callback.deleteClick);
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

  #setDatepicker = () => {
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #setDatepickerFrom = () => {
    if (this._data.startDate) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('input[name="event-start-time"]'),
        {
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._data.startDate,
          onChange: this.#dateFromChangeHandler,
        },
      );}
  }

  #setDatepickerTo = () => {
    if (this._data.finishDate) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('input[name="event-end-time"]'),
        {
          dateFormat: 'd/m/Y H:i',
          defaultDate: this._data.finishDate,
          onChange: this.#dateToChangeHandler,
        },
      );
    }
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      startDate: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      finishDate: userDate,
    });
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#cityChangeHandler);
  }

  #typeChangeHandler = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      const newType = evt.target.value;
      this.updateData({
        type: newType,
        offers: (additionalOffers.find((el) => el.type === newType)).offers,
      });
    }
  }

  #cityChangeHandler = (evt) => {
    const newCity = evt.target.value;
    const isCityExist = CITY.includes(newCity);
    evt.preventDefault();
    if (newCity.length <= 0 || !isCityExist) {
      evt.target.setCustomValidity('please select a city from the list');
    } else {
      evt.target.setCustomValidity('');
      this.updateData(
        {
          destination: {
            description: generateDescription(DESCRIPTION_CITY),
            name: newCity,
            pictures: [{
              src: getRandomPhotos(),
              description: generatePicDescription(PICTURES_CITY),
            }]
          }
        });
    }
    evt.target.reportValidity();
  }

  reset = (point) => {
    this.updateData(
      FormEditView.parsePointToData(point),
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormEditView.parseDataToPoint(this._data));
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  static parsePointToData = (point) => point
  static parseDataToPoint = (data) => data
}


export default FormEditView;
