import { OFFERS_TYPES} from '../constants.js';
import { BLANK_POINT } from '../utils/utils.js';
import SmartView from './smart-view.js';
import he from 'he';

import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

// const addNewEventButton = document.querySelector('.trip-main__event-add-btn');
const checkIsOfferSelected = (currentPointOffers, possibleProposal) => {
  const isSelected = currentPointOffers.some((offer) => offer.id === possibleProposal.id);
  return isSelected;
};

const createAdditionalOffer = (currentPointOffers, possibleProposals ) => {
  if (!possibleProposals.length) {
    return '';
  }
  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${possibleProposals.map((possibleProposal) => `<div class="event__offer-selector">
    <input
      class="event__offer-checkbox"
      id="event-offer-${possibleProposal.id}"
      type="checkbox"
      name="event-offer-${possibleProposal.id}"
      value="${possibleProposal.id}"
      ${checkIsOfferSelected(currentPointOffers, possibleProposal) ? 'checked' : ''}
      >
    <label class="event__offer-label" for="event-offer-${possibleProposal.id}">
      <span class="event__offer-title">${possibleProposal.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${possibleProposal.price}</span>
    </label>
  </div>`).join('')}
    </div>
  </section>`;
};

const createCityList = (destinationsFromModel) => (
  destinationsFromModel.map((obj) => (
    `<option value="${he.encode(obj.name)}"></option>`
  )).join('')
);

const createDestinationalPhoto = (photos) => `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${photos.map((el) => `<img class="event__photo" src="${el.src}" alt="${photos.description}">`)}
  </div>
</div>`;

const createTypeList = () => (
  OFFERS_TYPES.map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${type}</label>
    </div>`
  )).join('')
);

const getOfferByType = (offers, type) => {
  const offerByType = offers.find((offer) => offer.type === type);
  return offerByType;
};

const createFormEditTemplate = (data, availableOffersByType, destinationsFromModel ) => {
  const {type, basePrice, startDate, finishDate, destination, offers, id} = data;
  const addOffersOption = createAdditionalOffer(offers, availableOffersByType);
  const cityList = createCityList(destinationsFromModel);
  const typesList = createTypeList();
  const destinationPhotos = createDestinationalPhoto(destination.pictures);
  let showDestination = '';
  if (destination.name.length === 0) {
    showDestination = 'visually-hidden';
  }

  return  `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">
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
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${addOffersOption}
    </section>
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
  #tripOffer = null;
  #offers = null;
  #destinations = null;

  constructor(point, offers, destinations) {
    super();
    this._data = FormEditView.parsePointToData(point || BLANK_POINT);
    this.#offers = offers;
    this.#destinations = destinations;
    this.#tripOffer = getOfferByType(this.#offers, this._data.type).offers;
    this.#setDatepicker();
    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._data, this.#tripOffer, this.#destinations);
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
        });
    }
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
    this.element.querySelector('.event__section')
      .addEventListener('click', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').
      addEventListener('input', this.#priceChangeHandler);
  }

  #typeChangeHandler = (evt) => {
    const isNodeInput = evt.target.tagName === 'INPUT';

    if (!isNodeInput) {
      return;
    }

    const newType = evt.target.value;
    this.#tripOffer = getOfferByType(this.#offers, newType).offers;
    const newOffers = getOfferByType(this.#offers, newType).offers;
    this.updateData({
      type: newType,
      offers: newOffers,
    });
  }

  #cityChangeHandler = (evt) => {
    evt.preventDefault();

    const getMatchedDestination = (inputValue, destinations) => {
      const matchedDestination = destinations.find((el) => el.name === inputValue);
      return matchedDestination;
    };

    const cityInput = evt.target;
    const newCity = cityInput.value;
    const newDestination = getMatchedDestination(newCity, this.#destinations);

    if (!newDestination) {
      cityInput.setCustomValidity('please select a city from the list');
    } else {
      cityInput.setCustomValidity('');
      this.updateData({
        destination: newDestination,
      });
    }
    cityInput.reportValidity();
  }


  #offerChangeHandler = (evt) => {
    const isNodeInput = evt.target.tagName === 'INPUT';

    if (!isNodeInput) {
      return;
    }

    const hasSameOffer = this._data.offers.some((el) => el.id === Number(evt.target.value));
    const currentOffer = this.#tripOffer.find((el) => el.id === Number(evt.target.value));
    const newPointOffers = hasSameOffer
      ? this._data.offers.filter((el) => el.id !== Number(evt.target.value))
      : [...this._data.offers, currentOffer];

    this.updateData({
      offers: newPointOffers,
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
    // addNewEventButton.disabled = false;
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  static parsePointToData = (point) => point
  static parseDataToPoint = (data) => data
}

export default FormEditView;
