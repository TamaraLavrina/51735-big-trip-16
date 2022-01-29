import AbstractObservable from '../abstract-observable.js';

class DestinationModel extends AbstractObservable {
  #destinations = null;

  constructor() {
    super();
    this.#destinations = [];
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }

  get destinations() {
    return this.#destinations;
  }
}

export default DestinationModel;
