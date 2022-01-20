import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';

const displayRoute = (points) => {
  if (points.length >= 4) {
    return `${points[0].destination.name} — ... — ${points[points.length -1].destination.name}`;
  }
  return points.map((point) => point.destination.name).join(' — ');
};

const displayDate = (points) => {
  const start = points[0].startDate;
  const end = points[points.length - 1].finishDate;
  return `${dayjs(start).format('MMM DD')} — ${dayjs(end).format('MMM DD')}`;
};

const getTotalPrice = (points) => points.reduce((sum, {basePrice}) => sum + basePrice, 0);

const createMainTripInfoTemplate = (points) => {
  const route = displayRoute(points);
  const date = displayDate(points);
  const totalPrice = getTotalPrice(points);
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${route}</h1>

              <p class="trip-info__dates">${date}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
    </section>`;
};

class MainTripInfoView extends AbstractView{
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createMainTripInfoTemplate(this.#points);
  }
}

export default MainTripInfoView;
