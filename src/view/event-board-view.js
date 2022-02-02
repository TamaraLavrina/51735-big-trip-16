import AbstractView from './abstract-view.js';

const createEventBoardTemplate = () => (
  `<section class="trip-events">
  <h2 class="visually-hidden">Trip events</h2>
  </section>`
);

class EventBoardView extends AbstractView {
  get template() {
    return createEventBoardTemplate();
  }
}

export default EventBoardView;
