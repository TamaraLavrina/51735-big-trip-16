import EventSked from '../view/events-list-view.js';
import EventBoard from '../view/event-board-view.js';
import SortView from '../view/sort-view.js';
import EmptyList from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {render, RenderPosition} from '../render.js';
import { updateItem } from '../utils.js';


class TripListPresenter {
  #tripListContainer = null;
  #boardComponent = new EventBoard();
  #tripListComponent = new EventSked();
  #sortComponent = new SortView();
  #noPointsComponent = new EmptyList();

  #boardPoints = [];
  #pointPresenter = new Map();

  constructor(tripListContainer) {
    this.#tripListContainer = tripListContainer;
  }

  init = (boardPoints) => {
    this.#boardPoints = [...boardPoints];
    render(this.#tripListContainer, this.#boardComponent, RenderPosition.BEFOREEND);
    // render(this.#boardComponent, this.#tripListComponent, RenderPosition.BEFOREEND);
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderSort = () => {
    render(this.#boardComponent, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#boardPoints.forEach((boardPoint) => this.#renderPoint(boardPoint));
  }

  #renderNoPoints = () => {
    render(this.#boardComponent, this.#noPointsComponent, RenderPosition.AFTERBEGIN);
  }

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }


  #renderList = () => {
    render(this.#boardComponent, this.#tripListComponent, RenderPosition.BEFOREEND);
    this.#renderPoints();
  }

  #renderBoard = () => {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderList();
  }
}

export default TripListPresenter;
