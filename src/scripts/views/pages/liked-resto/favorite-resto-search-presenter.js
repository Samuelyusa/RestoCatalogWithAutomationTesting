class FavoriteRestoSearchPresenter {
  constructor({ favoriteRestaurant }) {
    this._listenToSearchRequestByUser();
    this._favoriteRestaurant = favoriteRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchRestaurant(event.target.value);
    });
  }

  _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery;
    this._favoriteRestaurant.searchRestaurant(this._latestQuery);
  }

  _showFoundRestaurant(restaurants) {
    const html = restaurants.reduce(
      (carry, restaurant) => carry.concat(`
      <li class="restaurant">
        <span class="restaurant__title">${restaurant.title || '-'}</span>
      </li>
      `
      ),
      '',
    );
    document.querySelector('.restaurants').innerHTML = html;
  }

  get latestQuery() {
    return this._latestQuery;
  }
  
}

export default FavoriteRestoSearchPresenter;