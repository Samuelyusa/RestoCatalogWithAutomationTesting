class FavoriteRestoSearchPresenter {
  constructor({ favoriteRestaurant, view }) {
    this._view = view;
    this._listenToSearchRequestByUser();
    this._favoriteRestaurant = favoriteRestaurant;
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
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
    //this._view.showRestaurant(restaurants);
    this._view.showFavoriteRestaurants(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
  
}

export default FavoriteRestoSearchPresenter;