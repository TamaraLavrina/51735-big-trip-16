import AbstractView from './abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type} = filter;

  return (
    `<div class="trip-filters__filter">
    <input
      type="radio"
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      name="trip-filter"
      ${type === currentFilterType ? 'checked' : ''}
       value="${type}"
    />
    <label class="trip-filters__filter-label" for="filter-${type}" >
      ${type}</label
    >
    </div>`
  );
};


const createSiteFiltersTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');
  return   `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createSiteFiltersTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

}

export default FilterView;
