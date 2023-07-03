import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createrestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantSearchView from './liked-resto/favorite-resto-search-view';
import FavoriteRestoSearchPresenter from './liked-resto/favorite-resto-search-presenter';
import FavoriteRestaurantShowPresenter from './liked-resto/favorite-resto-show-presenter'; 

const view = new FavoriteRestaurantSearchView();

const Favorite = {
	async render() {
		return view.getTemplate();
		// return `
    //     <div class="content">
    //         <h2 tabindex="0" class="content__heading">Favorites</h2>
    //         <div id="restaurants" class="restaurants">
    //         </div>
    //     </div>
    //     `;
	},

	async afterRender() {
		new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
		new FavoriteRestoSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
		
		// const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
		// const FavContainer = document.querySelector('.content');
		// const restaurantsContainer = document.querySelector('#restaurants');

		// const heroImage = document.querySelector('hero-comp');
		// heroImage.setAttribute('style', 'display:none');

		// if (restaurants.length !== 0) {
		// 	restaurants.forEach((restaurant) => {
		// 		restaurantsContainer.innerHTML += createrestaurantItemTemplate(restaurant);
		// 	});
		// } else {
		// 	const restaurantMessage = document.createElement('div');
		// 	restaurantMessage.classList.add('restaurant__emptyMessage');
		// 	FavContainer.appendChild(restaurantMessage);
		// 	const message = document.createElement('p');
		// 	message.innerHTML = 'No favorite restaurants have been added yet.<br>Add a Favorite Restaurant by pressing the thumbs up button.';
		// 	restaurantMessage.appendChild(message);
		// }
	},
};

export default Favorite;
