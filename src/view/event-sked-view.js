import AbstractView from './abstract-view.js';

const createEventsListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class EventSkedView extends AbstractView {
  get template() {
    return createEventsListTemplate();
  }
}

export default EventSkedView;
