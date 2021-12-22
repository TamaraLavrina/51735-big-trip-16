import AbstractView from './abstract-view.js';
import {SortType} from '../constants.js';

const createMainSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SortType.map((type) => `<div class="trip-sort__item  trip-sort__item--${type}}">
  <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
  <label class="trip-sort__btn" for="sort-${type}">${type}</label>
</div>`)}
</form>`
);

class SortView extends AbstractView {
  get template() {
    return createMainSortTemplate();
  }
}

export default SortView;


