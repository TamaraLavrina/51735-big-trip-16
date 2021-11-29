import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createSiteFiltersTemplate} from './view/site-filters-view.js';
import {renderTemplate, RenderPosition} from './render.js';
import {createMainSortTemplate} from './view/main-sort-view.js';
import {addPointTemplate} from './view/add-point-view.js';
import {createFormEditTemplate} from './view/form-edit-view.js';
import {createFormAddNewPointTemplate} from './view/form-add-new-view.js';
import {createEventsListTemplate} from './view/events-list-view.js';

const EVENT_POINT_COUNT = 3;

const headerMainElement = document.querySelector('.trip-main');
const siteNavElement = headerMainElement.querySelector('.trip-controls__navigation');
const siteFiltersElement = headerMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-body__page-main');
const mainEvents = pageMainElement.querySelector('.trip-events');

renderTemplate(siteNavElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFiltersElement, createSiteFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainEvents, createMainSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainEvents, createEventsListTemplate(), RenderPosition.BEFOREEND);

const mainEventsList = mainEvents.querySelector('.trip-events__list');
renderTemplate(mainEventsList, createFormAddNewPointTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_POINT_COUNT; i++) {
  renderTemplate(mainEventsList, addPointTemplate(), RenderPosition.BEFOREEND);
}

renderTemplate(mainEventsList, createFormEditTemplate(), RenderPosition.BEFOREEND);
