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

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurant.searchRestaurant(this._latestQuery);
    } else {
      foundRestaurants = await this._favoriteRestaurant.getAllRestaurants();
    }
  
    this._showFoundRestaurant(foundRestaurants);
  }

  _showFoundRestaurant(restaurants) {
    let html;

    if (restaurants?.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(`
        <li class="restaurant">
          <span class="restaurant__title">${restaurant.title || '-'}</span>
        </li>
        `), '',
      );
    } else {
      html = '<div class="restaurants__not__found">Restaurant tidak ditemukan</div>';
    }
    
    document.querySelector('.restaurants').innerHTML = html;
    document.getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));
  }

  get latestQuery() {
    return this._latestQuery;
  }
  
}

export default FavoriteRestoSearchPresenter;