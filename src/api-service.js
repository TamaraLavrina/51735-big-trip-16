const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get points() {
    return this.#load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (point) => {
    const response = await this.#load({
      url: `tasks/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'date_from': point.startDate.toISOString(),
      'date_to': point.finishDate.toISOString(),
      'is_favorite': point.isFavorite,
      // 'id': String(point.id),
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint.startDate;
    delete adaptedPoint.finishDate;
    delete adaptedPoint.isFavorite;
    // delete adaptedPoint.id;

    return adaptedPoint;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
