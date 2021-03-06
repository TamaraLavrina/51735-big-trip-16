import AbstractObservable from '../abstract-observable.js';

class DestinationsModel extends AbstractObservable {
  #destinations = null;

  constructor() {
    super();
    this.#destinations = [];
  }

  setDestinations(destinations) {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}

export default DestinationsModel;

