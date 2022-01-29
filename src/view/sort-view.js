import AbstractView from './abstract-view.js';
import {SortType} from '../constants.js';

const createMainSortTemplate = (currentSortType) => {
  const sortDirections = Object.values(SortType);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortDirections.map((obj) => `<div class="trip-sort__item  trip-sort__item--${obj}">
    <input
    id="sort-${obj}"
    class="trip-sort__input  visually-hidden"
    data-sort-type="${obj}"
    type="radio"
    ${obj  === currentSortType ? 'checked' : ''}
    name="trip-sort"
    />
    <label class="trip-sort__btn" for="sort-${obj}">${obj}</label>
  </div>`).join('')}
  </form>`;};

class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createMainSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    const { sortType  } = evt.target.dataset;
    const hasAttr = Boolean(sortType);
    if (!hasAttr) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}

export default SortView;


