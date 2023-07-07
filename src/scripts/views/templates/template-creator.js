import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import CONFIG from '../../globals/config';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const createrestaurantDetailTemplate = (restaurant) => `
    <img tabindex="0" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
        alt="Restaurant Image" class="restaurant__poster skeleton"/>
        
    <div class="restaurant__details">
        <h1 tabindex="0" class="restaurant__name skeleton">${restaurant.name}</h1>
        <p tabindex="0" class="restaurant__address skeleton">${restaurant.address}, ${restaurant.city}</p>
        <p tabindex="0" class="restaurant__rating skeleton">
        <span>
            <img alt="Restaurant Rating" src="${CONFIG.ICON}star-rate.png" style="vertical-align: bottom;" class="skeleton" />
        </span>
        ${restaurant.rating} / 5</p>

        <div class="tag__categories skeleton">
        </div>

        <div class="restaurant__subTitle skeleton">
            <h2 tabindex="0">Description</h2>
        </div>
        <div class="restaurant__description skeleton">
            <p tabindex="0">${restaurant.description}</p>
        </div>

        <div class="restaurant__subTitle skeleton">
            <h2 tabindex="0">Menu</h2>
        </div>

        <div class="restaurant__subTitle skeleton">
            <h3 tabindex="0">Culinary Perfection</h3>
        </div>
        <div class="restaurant__menu skeleton">
            <div class="restaurant__food"></div>
        </div>

        <div class="restaurant__subTitle skeleton">
            <h3 tabindex="0">Our Delightful Drinks</h3>
        </div>
        <div class="restaurant__menu skeleton">
            <div class="restaurant__drink"></div>
        </div>
    </div>
    `;

const createReviewTemplate = () => `
    <div class="restaurant__addReview skeleton">
        <p><label>Add your experience<label></p>
        <input id="addReviewName" type="text" placeholder="Tell us your name here.."/>
        <textarea id="addReviewText" placeholder="Tell us your review here.."/></textarea>
        <span class="errorMessage" id="errorMessage"></span>
        <button type="submit" id="submit-btn">Submit</button>
    </div>

    <div class="restaurant__subTitle skeleton">
        <p tabindex="0">CUSTOMER EXPERIENCES</p>
    </div>

    <div class="restaurant__subTitleBold skeleton">
        <p tabindex="0">What They Say</p>
    </div>`;

const displayNewReviewTemplate = () => `
    <div id="restaurant__Newcomment"></div>`;

const createrestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-item">
        <div class="restaurant-item__header skeleton">
        <picture>
            <source media="(max-width: 1024px)" data-srcset="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
            <img data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}"
                alt="${restaurant.name || '-'}"
                class="restaurant-item__header__poster lazyload">
        </picture>
        
        <div class="restaurant-item__header__rating">
            <span><img src="${CONFIG.ICON}/star-rate.png" alt="" class="star-rate skeleton"></span><span class="restaurant-item__header__rating__score">${restaurant.rating || '-'}</span>
        </div>
        </div>
        <div class="restaurant-item__content">
        <h3 class="restaurant__title skeleton"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
        <p class="skeleton">${restaurant.description || '-'}</p>
        </div>
    </div>`;

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
    </button>`;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
    </button>`;

export {
	createrestaurantItemTemplate,
	createrestaurantDetailTemplate,
	createReviewTemplate,
	displayNewReviewTemplate,
	createLikeButtonTemplate,
	createLikedButtonTemplate,
};
