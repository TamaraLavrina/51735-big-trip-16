import dayjs  from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import AbstractView from './abstract-view.js';
import { getDuration } from '../utils/utils.js';

const createPointTemplate = (point) => {
  const {type, basePrice, startDate, finishDate, destination, offers, isFavorite} = point;
  const dateFinishHours = dayjs(finishDate).format('HH:mm');
  const dateStartHours = dayjs(startDate).format('HH:mm');
  const startDateMonthAndDay = dayjs(startDate).format('MMM D');
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn'
    : 'event__favorite-btn--active';
  const pointDuration = getDuration(startDate,finishDate);

  return  `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${startDateMonthAndDay}">${startDateMonthAndDay}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event ${type} icon">
    </div>
    <h3 class="event__title">${type} to ${destination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateStartHours}">${dateStartHours}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateFinishHours}">${dateFinishHours}</time>
      </p>
      <p class="event__duration">${pointDuration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offers.map((item) =>
    `<li class="event__offer">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </li>`).join('')
}
    </ul>
    <button class="event__favorite-btn  ${favoriteClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

class PointView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

export default PointView;
