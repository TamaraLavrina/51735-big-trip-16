import { render, RenderPosition } from './utils/render.js';
import { EVENT_POINT_COUNT } from './constants.js';
import MainTripView from './view/main-trip-view.js';
import { generatePoint } from './mock/trip-point.js';
import SiteMenuView from './view/site-menu-view.js';
import TripListPresenter from './presenter/triplist-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';

const points = Array.from({length: EVENT_POINT_COUNT}, generatePoint);


const pointsModel = new PointsModel();
pointsModel.points = points;
const filterModel = new FilterModel();
const offersModel = new OffersModel();

const header = document.querySelector('.page-header__container');
const pageBody = document.querySelector('.page-body__page-main').querySelector('.page-body__container');
const mainTripComponent = new MainTripView();
const tripListPresenter = new TripListPresenter(pageBody, mainTripComponent, pointsModel, filterModel, offersModel);
const controls = mainTripComponent.element.querySelector('.trip-main__trip-controls');

render(header, mainTripComponent, RenderPosition.BEFOREEND );
render(controls, new SiteMenuView(), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(controls, filterModel, pointsModel);

filterPresenter.init();
tripListPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripListPresenter.createPoint();
});

const newPointButton = document.querySelector('.trip-main__event-add-btn');
newPointButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPointButton.disabled = true;
  tripListPresenter.createPoint();
});

