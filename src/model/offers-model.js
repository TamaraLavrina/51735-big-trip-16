import AbstractObservable from '../abstract-observable.js';

class OffersModel extends AbstractObservable {
  #offers = [];

  set Offers(offers) {
    this.#offers = offers;
  }

  get Offers() {
    return this.#offers;
  }
}

export default OffersModel;
