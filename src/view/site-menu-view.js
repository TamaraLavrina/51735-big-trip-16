import AbstractView from './abstract-view.js';
import { MenuItem } from '../constants.js';

const createSiteMenuTemplate = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
    <div class="trip-menu ">
        <input
        type="radio"
        name="control"
        id="control__task"
        class="trip-tabs__input"
        value="${MenuItem.TABLE}"
        checked />
      <label for="control__task" class="trip-tabs__btn">${MenuItem.TABLE}</label>
    </div>
    <div class ="trip-menu " >
     <input
      type="radio"
      name="control"
      id="control__task"
      class="trip-tabs__input"
      value="${MenuItem.STATS}" />
    <label for="control__task" class="trip-tabs__btn">${MenuItem.STATS}</label>
    </div>
    </nav>
  </div>`
);

class SiteMenuView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.value);
  }
}
export default SiteMenuView;
