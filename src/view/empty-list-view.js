import AbstractView from './abstract-view.js';

const createLoadingTemplate = () => (
  `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  <p class="trip-events__msg">Click New Event to create your first point</p>
  </section>`
);

class EmptyList extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}

export default EmptyList;
