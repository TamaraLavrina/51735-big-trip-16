import AbstractObservable from '../abstract-observable.js';
import { UpdateType } from '../constants.js';

class OffersModel extends AbstractObservable {
  #offers = null;
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
    this.#offers = [];
  }

  set offers(offers) {
    this.#offers = offers;
    this._notify(offers);
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offers = await this.#apiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

}

export default OffersModel;
