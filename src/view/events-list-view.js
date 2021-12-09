import AbstractView from './abstract-view.js';

const createEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class EventSked extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}

export default EventSked;
