import {createElement} from '../render.js';

const createLoadingTemplate = () => (
  `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">Loading...</p>
  </section>`
);

class Loading {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createLoadingTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

export default Loading;
