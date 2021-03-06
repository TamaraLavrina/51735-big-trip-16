import AbstractObservable from '../abstract-observable.js';

class OffersModel extends AbstractObservable {
  #offers = null;

  constructor() {
    super();
    this.#offers = [];
  }

  setOffers(offers) {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }
}

export default OffersModel;
