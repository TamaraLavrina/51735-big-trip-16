import EventSked from '../view/events-list-view.js';
import EventBoard from '../view/event-board-view.js';
import SortView from '../view/sort-view.js';
import EmptyList from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import MainTripInfoView from '../view/main-trip-info.js';
import { SortType, UpdateType, UserAction, EVENT_POINT_COUNT, FilterType } from '../constants.js';
import { sortPointPrice, sortPointDay, sortPointTime } from '../utils/utils.js';
import {filter} from '../utils/filter.js';


class TripListPresenter {
  #tripListContainer = null;
  #routContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #offersModel = null;
  #offers = null;

  #boardComponent = new EventBoard();
  #tripListComponent = new EventSked();
  #noPointsComponent = new EmptyList();
  #sortComponent = null;

  #renderedPointCount = EVENT_POINT_COUNT;
  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #tripInfoComponent = null;

  constructor(tripListContainer, routContainer, pointsModel, filterModel, offersModel) {
    this.#tripListContainer = tripListContainer;
    this.#routContainer = routContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#tripListComponent, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortType.PRICE:{
        return filteredPoints.sort(sortPointPrice);
      }
      case SortType.TIME:{
        return filteredPoints.sort(sortPointTime);
      }
      default:{
        return filteredPoints.sort(sortPointDay);
      }
    }
  }

  get offers() {
    this.#offers = this.#offersModel.offers;
    return this.#offers;
  }

  init = () => {
    render(this.#tripListContainer, this.#boardComponent, RenderPosition.BEFOREEND);
    this.#renderBoard();
  }

  createPoint = () => {
    this.#currentSortType = SortType.DAY;
    this.#offers = this.#offersModel.offers;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(this.offers);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:{
        this.#pointsModel.updatePoint(updateType, update);
        break;
      }

      case UserAction.ADD_POINT:{
        this.#pointsModel.addPoint(updateType, update);
        break;
      }
      case UserAction.DELETE_POINT:{
        this.#pointsModel.deletePoint(updateType, update);
        break;
      }
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:{
        this.#pointPresenter.get(data.id).init(data);
        break;
      }
      case UpdateType.MINOR:{
        this.#clearBoard();
        this.#renderBoard();
        break;
      }
      case UpdateType.MAJOR:{
        this.#clearBoard({ resetSortType: true});
        this.#renderBoard();
        break;
      }
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedPointCount: true});
    this.#renderBoard();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#boardComponent, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderMainTripInfo = () => {
    if(this.#tripInfoComponent !== null) {
      this.#tripInfoComponent = null;
    }
    const sortedPoints = this.#pointsModel.points.sort(sortPointDay);

    this.#tripInfoComponent = new MainTripInfoView(sortedPoints);
    render(this.#routContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    this.#offers = this.#offersModel.offers;
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#offers);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints = () => {
    this.#noPointsComponent = new EmptyList(this.#filterType);
    render(this.#boardComponent, this.#noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderList = () => {
    render(this.#boardComponent, this.#tripListComponent, RenderPosition.BEFOREEND);
    const points = this.points;
    this.#renderPoints(points);
  }

  #clearBoard = ({resetRenderedPointCount = false, resetSortType = false} = {}) => {
    const pointCount = this.points.length;

    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);
    remove(this.#tripInfoComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetRenderedPointCount) {
      this.#renderedPointCount = EVENT_POINT_COUNT;
    } else {
      this.#renderedPointCount = Math.min(pointCount, this.#renderedPointCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard = () => {
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderMainTripInfo();
    this.#renderList();
  }
}

export default TripListPresenter;
