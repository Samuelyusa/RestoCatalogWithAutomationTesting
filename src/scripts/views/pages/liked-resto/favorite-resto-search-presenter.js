class FavoriteRestoSearchPresenter {
  constructor({ favoriteRestaurants, view }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();
    
    let foundRestaurants;
    if (this.latestQuery?.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurant(this._latestQuery);
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants();
    }
  
    this._showFoundRestaurant(foundRestaurants);
  }

  _showFoundRestaurant(restaurants) {
    //this._view.showRestaurant(restaurants);
    this._view.showFavoriteRestaurants(restaurants);
    this._deleteSkeleton();
  }

  get latestQuery() {
    return this._latestQuery;
  }

  _deleteSkeleton() {
    const allSkeleton = document.querySelectorAll('.skeleton')
    const allSkeletonText = document.querySelectorAll('.skeleton-text')
    const allSkeletonTitle = document.querySelectorAll('.skeleton-title')
    allSkeletonText.forEach(item => {
      item.classList.remove('skeleton-text')
    });
    allSkeletonTitle.forEach(item => {
      item.classList.remove('skeleton-title')
    });
    allSkeleton.forEach(item => {
      item.classList.remove('skeleton')
    });
  }
  
}

export default FavoriteRestoSearchPresenter;