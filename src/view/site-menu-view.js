import AbstractView from './abstract-view.js';
import { MenuItem } from '../constants.js';

const createSiteMenuTemplate = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" value="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#" value="${MenuItem.STATS}">${MenuItem.STATS}</a>
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
    this._callback.menuClick(evt.target.text);
  }
}
export default SiteMenuView;
