/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from './liked-resto/favorite-resto-search-view';
import FavoriteRestoSearchPresenter from './liked-resto/favorite-resto-search-presenter';
import FavoriteRestaurantShowPresenter from './liked-resto/favorite-resto-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
	async render() {
		return view.getTemplate();
	},

	async afterRender() {
		new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
		new FavoriteRestoSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });

		this._hideHero();
	},

	_hideHero() {
		document.querySelector('hero-comp').style.display = 'none';
	},
};

export default Favorite;
