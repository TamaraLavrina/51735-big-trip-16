import { render, RenderPosition } from './render.js';
import { EVENT_POINT_COUNT } from './constants.js';
import MainTripView from './view/main-trip-view.js';
import { generatePoint } from './mock/trip-point.js';
import { generateFilter } from './mock/filters.js';
import SiteMenuView from './view/site-menu-view.js';
import FilterView from './view/filter-view.js';
import MainTripInfoView from './view/main-trip-info.js';
// import EventSked from './view/events-list-view.js';
// import SortView from './view/sort-view.js';
// import PointView from './view/point-view.js';
// import FormEditView from './view/form-edit-view.js';
// import EmptyList from './view/empty-list-view.js';
// import EventBoard from './view/event-board-view.js';
import TripListPresenter from './presenter/triplist-presenter.js';

const points = Array.from({length: EVENT_POINT_COUNT}, generatePoint);
const filters = generateFilter(points);

const header = document.querySelector('.page-header__container');
const pageBody = document.querySelector('.page-body__page-main').querySelector('.page-body__container');
const pointPresenter = new TripListPresenter(pageBody);

const mainTripComponent = new MainTripView();
const controls = mainTripComponent.element.querySelector('.trip-main__trip-controls');

render(header, mainTripComponent, RenderPosition.BEFOREEND );
render(controls, new SiteMenuView(), RenderPosition.BEFOREEND);
render(controls, new FilterView(filters), RenderPosition.BEFOREEND);

render(mainTripComponent.element, new MainTripInfoView().element, RenderPosition.AFTERBEGIN);
pointPresenter.init(points);
