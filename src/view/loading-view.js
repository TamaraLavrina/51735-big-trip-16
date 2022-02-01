import AbstractView from './abstract-view';

const createLoadingMessage = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

class LoadingView extends AbstractView {
  get template() {
    return createLoadingMessage();
  }
}

export default LoadingView;

