import { render, RenderPosition, remove } from './utils/render.js';
import { EVENT_POINT_COUNT, MenuItem, additionalOffers } from './constants.js';
import MainTripView from './view/main-trip-view.js';
import { generatePoint } from './mock/trip-point.js';
import SiteMenuView from './view/site-menu-view.js';
import TripListPresenter from './presenter/triplist-presenter.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import OffersModel from './model/offers-model.js';
import StatisticsView from './view/statistics-view.js';

const points = Array.from({length: EVENT_POINT_COUNT}, generatePoint);
const pointsModel = new PointsModel();
pointsModel.points = points;
const filterModel = new FilterModel();
const offersModel = new OffersModel(additionalOffers);


const header = document.querySelector('.page-header__container');
const pageBody = document.querySelector('.page-body__page-main').querySelector('.page-body__container');
const mainTripComponent = new MainTripView();
const tripListPresenter = new TripListPresenter(pageBody, mainTripComponent, pointsModel, filterModel, offersModel);
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
      // tripListPresenter.renderMainTripInfo();
      //вот тут, мне нужно отобразить только часть презентера - что показывает маршрут, и не получается ее вызвать
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(pageBody, statisticsComponent, RenderPosition.BEFOREEND);
      siteMenuComponent.setMenuItem(MenuItem.STATS);
    }
      break;
  }
};

newPointButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  // tripListPresenter.destroy();
  // tripListPresenter.init();
  tripListPresenter.createPoint(handlePointNewFormClose);
  siteMenuComponent.element.querySelector(`[value=${MenuItem.TABLE}]`).disabled = true;
  siteMenuComponent.element.querySelector(`[value=${MenuItem.STATS}]`).disabled = true;
});

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
render(controls, siteMenuComponent, RenderPosition.BEFOREEND);

filterPresenter.init();
tripListPresenter.init();


