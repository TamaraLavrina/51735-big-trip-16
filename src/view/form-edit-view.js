import { CITY, OFFERS_TYPES, DESCRIPTION_CITY, PICTURES_CITY, additionalOffers } from '../constants.js';
import {generateDescription, generatePicDescription, getRandomPhotos } from '../mock/trip-point.js';
import { BLANK_POINT } from '../mock/trip-point.js';
import SmartView from './smart-view.js';
import he from 'he';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const addNewEventButton = document.querySelector('.trip-main__event-add-btn  btn  btn--big  btn--yellow');

const createEventRollupButtonTemplate = (isNewEvent) => (
  `${!isNewEvent ? `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`: ''}`
);

const createContentButton = (isNewEvent) => (
  `${isNewEvent ? 'Cancel' : 'Delete'}`
);

const createAdditionalOffer = (offers) => {
  if (offers.length) {
    return `<div class="event__available-offers">
    ${offers.map(({title, id, price}) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" data-title="${title.toLowerCase()}" data-price="${price}" >
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
    `<option value="${he.encode(city)}"></option>`
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

const createFormEditTemplate = (data,  isNewPoint) => {
  const {type, basePrice, startDate, finishDate, destination, offers, id} = data;
  const offersTemplate = createAdditionalOffer(offers);
  const cityList = createCityList();
  const typesList = createTypeList();
  const eventRollupButton = createEventRollupButtonTemplate(isNewPoint);
  const buttonText = createContentButton(isNewPoint);
  const destinationPhotos = createDestinationalPhoto(destination.pictures);
  let showDestination = '';

  if (destination.name.length === 0) {
    showDestination = 'visually-hidden';
  }

  return  `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${typesList}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${id}}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}}">
        <datalist id="destination-list-${id}">
        ${cityList}
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${finishDate}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">${basePrice}</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${buttonText}</button>
      ${eventRollupButton}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">${offersTemplate}</div></section>
        <section class="event__section  event__section--destination ${showDestination}">
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

  #offers = null;
  #newPoint = null;

  constructor(data) {
    super();
    const {point = BLANK_POINT, offers} = data;
    //вот если в консруктор передаю дату то в списке при открытие не текущие точки,
    // а бланк пойнт как и следовало ожидать и отредактировать их невозможно, ну и сохранение не работает?
    //как починить открытие формы редактивание для уже существующих точек
    this._data = FormEditView.parsePointToData(point);
    this.#newPoint = !point;
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.#offers = offers;
  }

  get template() {
    const isNewPoint = (this._newPoint);
    return createFormEditTemplate(this._data, this.#offers, isNewPoint);
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
    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
    }
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
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          ['time_24hr']: true,
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
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          ['time_24hr']: true,
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
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').
      addEventListener('input', this.#priceChangeHandler);

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

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    /*
    вот тут не понимаю как правильно написать фильтр, что-то туплю....
    console.log(this._data.offers);
    console.log('дата');
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    console.log(checkedOffers);
    const offerIds = checkedOffers.map((element) => element.dataset.id);
    console.log(offerIds);
    console.log('чекнутые айди');
    const updatedOffers = this._data.offers.filter((item) => item.id === offerIds);
    console.log(updatedOffers);
    console.log('фильтрованные офферы');
    еще непонятно что произошло с состоянием checked - задавать заново?
    const newOffers = evt.target;
    newOffers.setAttribute('checked' , '');
    */

    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox'));
    const currentOffers = [];
    checkedOffers.forEach((offer) => {
      if(offer.checked) {
        currentOffers.push({
          id: offer.dataset.id,
          title: offer.dataset.title,
          price: Number(offer.dataset.price),
        });
      }});

    this.updateData({
      offers: currentOffers,
      isOffers: currentOffers.length !== 0,
      //была мысль сохранять в дате и передавать потом в разметку,
      // в класс секции офферов - нет оферов, то и не рисовать секцию - visually-hidden
      // однако если ставить сразу, то вообще перестает отображать
    });
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value <= 0 || isNaN(evt.target.value)) {
      evt.target.setCustomValidity('Цена может быть только положительным числом');
    } else {
      evt.target.setCustomValidity('');
      this.updateData({
        basePrice: + Number(evt.target.value),
      }, true);
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
    addNewEventButton.disabled = false;
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  static parsePointToData = (point) => point
  static parseDataToPoint = (data) => data
}

export default FormEditView;


