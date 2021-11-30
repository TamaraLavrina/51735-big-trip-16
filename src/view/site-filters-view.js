const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<div class="trip-filters__filter">
    <input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
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

export {createSiteFiltersTemplate};
