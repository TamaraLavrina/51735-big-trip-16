import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {renderTemplate, RenderPosition} from './render.js';

const siteMainElement = document.querySelector('.trip-main');
const siteNavElement = siteMainElement.querySelector('.trip-controls__navigation');

renderTemplate(siteNavElement, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
