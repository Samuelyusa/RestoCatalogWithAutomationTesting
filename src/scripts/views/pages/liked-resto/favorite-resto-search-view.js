/* eslint-disable class-methods-use-this */
import { createrestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
	getTemplate() {
		return `
      <div class="content">
        <input id="query" type="text" placeholder="Search..." autofocus>
        <h2 class="content__heading">Your Liked Restaurant</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
    `;
	}

	runWhenUserIsSearching(callback) {
		document.getElementById('query').addEventListener('change', (event) => {
			callback(event.target.value);
		});
	}

	showFavoriteRestaurants(restaurants = []) {
		let html;

		if (restaurants.length) {
			html = restaurants.reduce((carry, restaurant) => carry.concat(createrestaurantItemTemplate(restaurant)), '');
		} else {
			html = this._getEmptyRestaurantTemplate();
		}

		document.getElementById('restaurants').innerHTML = html;

		document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
	}

	_getEmptyRestaurantTemplate() {
		return '<div class="restaurant-item__not__found">Restaurant tidak ditemukan</div>';
	}
}

export default FavoriteRestaurantSearchView;
