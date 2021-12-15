import AbstractView from './abstract-view.js';
import {SortType} from '../constants.js';

const createMainSortTemplate = (sortType) => {
  const sortDirections = Object.values(SortType);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortDirections.map(({name, disabled}) => `<div class="trip-sort__item  trip-sort__item--${name}">
    <input id="sort-${name}" class="trip-sort__input  visually-hidden" data-sort-type="${name}" type="radio" name="trip-sort" value="sort-${name}" ${sortType === name ? 'checked' : ''} ${disabled === true ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>`).join('')}
  </form>`;};


class SortView extends AbstractView {
  get template() {
    return createMainSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}

export default SortView;


