import FormEditView from '../view/form-edit-view.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../constants.js';


class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;

  #pointEditComponent = null;
  #destroyCallback = null;
  // #offers = null;
  // #destinations = null;

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = (callback, commonOffers, commonDestinations) => {
    if (this.#pointEditComponent !== null) {
      return;
    }
    this.#destroyCallback = callback;

    this.#pointEditComponent = new FormEditView(null, commonOffers, commonDestinations);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    if (this.#destroyCallback !== null) {
      this.#destroyCallback();
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}

export default PointNewPresenter;
