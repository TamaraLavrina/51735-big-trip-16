import AbstractView from './abstract-view.js';

const createLoadingTemplate = () => (
  `<p class="trip-events__msg">
  Click New Event to create your first point
  </p>`
);

class EmptyList extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}

export default EmptyList;
