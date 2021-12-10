import AbstractView from './abstract-view.js';

const createMainTripTemplate = () => (
  `<div class="trip-main">
    <div class="trip-main__trip-controls  trip-controls">
    </div>
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
  </div>`
);

class MainTripView extends AbstractView{
  get template() {
    return createMainTripTemplate();
  }
}

export default MainTripView;
