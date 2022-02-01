import { render, RenderPosition, remove} from './utils/render.js';
import { MenuItem, END_POINT, AUTHORIZATION, UpdateType } from './constants.js';
import MainTripView from './view/main-trip-view.js';
import SiteMenuView from './view/site-menu-view.js';
import TripListPresenter from './presenter/triplist-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import StatisticsView from './view/statistics-view.js';
import DestinationModel from './model/destinations-model.js';
import ApiService from './api-service.js';


const api = new ApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(api);
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationModel();


const header = document.querySelector('.page-header__container');
const pageBody = document.querySelector('.page-body__page-main').querySelector('.page-body__container');
const mainTripComponent = new MainTripView();
const tripListPresenter = new TripListPresenter(pageBody,  pointsModel, filterModel, offersModel, destinationsModel);
const controls = mainTripComponent.element.querySelector('.trip-main__trip-controls');
const siteMenuComponent = new SiteMenuView();

render(header, mainTripComponent, RenderPosition.BEFOREEND );

const filterPresenter = new FilterPresenter(controls, filterModel, pointsModel);

const newPointButton = document.querySelector('.trip-main__event-add-btn');

const handlePointNewFormClose = () => {
  siteMenuComponent.element.querySelector(`[value=${MenuItem.TABLE}]`).disabled = false;
  siteMenuComponent.element.querySelector(`[value=${MenuItem.STATS}]`).disabled = false;
  newPointButton.disabled = false;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE: {
      remove(statisticsComponent);
      filterPresenter.destroy();
      filterPresenter.init();
      tripListPresenter.destroy();
      tripListPresenter.init();
      siteMenuComponent.element.querySelector(`[value=${MenuItem.TABLE}]`).disabled = true;
      siteMenuComponent.element.querySelector(`[value=${MenuItem.STATS}]`).disabled = true;
      remove(statisticsComponent);
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      break;
    }

    case MenuItem.STATS: {
      filterPresenter.destroy();
      tripListPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(pageBody, statisticsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent.setMenuItem(MenuItem.STATS);
    }
      break;
  }
};

newPointButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPointButton.disabled = true;
  tripListPresenter.createPoint(handlePointNewFormClose);
  siteMenuComponent.element.querySelector(`[value=${MenuItem.TABLE}]`).disabled = true;
  siteMenuComponent.element.querySelector(`[value=${MenuItem.STATS}]`).disabled = true;
});


Promise.all([
  api.getPoints(),
  api.getOffers(),
  api.getDestinations(),
])
  .then((values) => {
    const [points, offers, destinations] = values;
    offersModel.setOffers(offers);
    destinationsModel.setDestinations(destinations);
    pointsModel.setPoints(UpdateType.INIT, points);
  })
  .catch(() => {
    destinationsModel.destinations = [];
    offersModel.offers = [];
    pointsModel.points = [];
  })
  .finally(() => {
    filterPresenter.init();
    tripListPresenter.init();
    render(controls, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    newPointButton.disabled = false;
  });
