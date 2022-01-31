import AbstractObservable from '../abstract-observable.js';

class DestinationModel extends AbstractObservable {
  #destinations = null;
  #apiService = null;

  constructor( apiService) {
    super();
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#apiService.destinations;
      this.#destinations = destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }
}

export default DestinationModel;

