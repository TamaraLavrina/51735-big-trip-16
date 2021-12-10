import { render, RenderPosition, replace } from './render.js';
import { EVENT_POINT_COUNT } from './constants.js';
import MainTripView from './view/main-trip-view.js';
import MainTripInfoView from './view/main-trip-info.js';
import SiteMenuView from './view/site-menu-view.js';
import EventSked from './view/events-list-view.js';
import SortView from './view/sort-view.js';
import FilterView from './view/filter-view.js';
import PointView from './view/point-view.js';
import FormEditView from './view/form-edit-view.js';
import EmptyList from './view/empty-list-view.js';
import { generatePoint } from './mock/trip-point.js';
import { generateFilter } from './mock/filters.js';

const points = Array.from({length: EVENT_POINT_COUNT}, generatePoint);
const filters = generateFilter(points);

const header = document.querySelector('.page-header__container');
const mainEvents = document.querySelector('.trip-events');

const eventListComponent = new EventSked();
const mainTripComponent = new MainTripView();
const controls = mainTripComponent.element.querySelector('.trip-main__trip-controls');

render(header, mainTripComponent, RenderPosition.BEFOREEND );
render(controls, new SiteMenuView(), RenderPosition.BEFOREEND);
render(controls, new FilterView(filters), RenderPosition.BEFOREEND);
render(mainEvents, eventListComponent, RenderPosition.BEFOREEND);

const renderPoint = (eventListElement, point) => {
  const pointComponent = new PointView(point);
  const formEditComponent = new FormEditView(point);

  const replaceCardToForm = () => {
    replace(formEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, formEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  formEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  formEditComponent.setRollUpClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, pointComponent.element, RenderPosition.BEFOREEND);
};

if (points.length === 0) {
  render(eventListComponent.element, new EmptyList().element, RenderPosition.BEFOREEND );
} else {
  render(mainTripComponent.element, new MainTripInfoView().element, RenderPosition.AFTERBEGIN);
  render(mainEvents, new SortView().element, RenderPosition.AFTERBEGIN);
  for (let i = 0; i < EVENT_POINT_COUNT; i++) {
    renderPoint(eventListComponent.element, points[i]);
  }
}

