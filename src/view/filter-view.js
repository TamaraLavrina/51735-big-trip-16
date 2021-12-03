import { createElement } from '../render';

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<div class="trip-filters__filter">
    <input
      type="radio"
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      name="trip-filter"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}
      value="${name}"
    />
    <label class="trip-filters__filter-label" for="filter-${name}" >
      ${name} <span>${count}</span></label
    >
    </div>`
  );
};


const createSiteFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return   `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

class FilterView {
  #element = null;
  #filters = null;

  constructor(filters) {
    this.#filters = filters;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteFiltersTemplate(this.#filters);
  }

  removeElement() {
    this.#element = null;
  }
}

export default FilterView;

