import AbstractObservable from '../abstract-observable.js';

class OffersModel extends AbstractObservable {
  #offers = [];

  set offers(offers) {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }
}

export default OffersModel;
