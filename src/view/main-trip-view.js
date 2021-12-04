import {createElement} from '../render.js';

const createMainTripTemplate = () => (
  `<div class="trip-main">
    <div class="trip-main__trip-controls  trip-controls">
    </div>
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  </div>`
);

class MainTripView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMainTripTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default MainTripView;
