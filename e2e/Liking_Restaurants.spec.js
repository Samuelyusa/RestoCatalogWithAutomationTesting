const assert = require('assert');
const { async } = require('regenerator-runtime');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({I}) => {
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');

  const firstRestaurant = locate('.restaurant__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.waitForClickable('.restaurant__title a',6);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');

  I.waitForClickable('.restaurant__title a',6);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');

  I.waitForClickable('.restaurant__title a',6);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');

});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');

  const titles = [];

  I.amOnPage('/');

  for (let i = 1; i <= 3; i++) {
    I.waitForElement('.restaurant-item', 5);
    I.seeElement('.restaurant-item');

    I.waitForClickable('.restaurant__title a', 6);
    I.click(locate('.restaurant__title a').at(i));

    I.waitForElement('#likeButton', 5);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    titles.push(await I.grabTextFrom('.restaurant__name'));

    I.amOnPage('/');
  }
  
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  I.seeElement('#query');
  
  const searchQuery = titles[1].substring(3, 4);
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});

Scenario('Add one customer review', async ({ I }) => {
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');

  I.waitForClickable('.restaurant__title a',6);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#addReviewName', 5);
  I.seeElement('#addReviewName');

  const customerName = "Robert Saja";
  const customerReview = "Saya suka sekali!";

  I.fillField('#addReviewName', customerName);

  I.seeElement('#addReviewText');
  I.fillField('#addReviewText', customerReview);

  I.waitForClickable('#submit-btn',5);
  I.click('#submit-btn');
  
  I.scrollPageToBottom('#restaurant__Newreview');
  I.seeElement('#restaurant__Newreview');
  I.waitForElement(locate('.restaurant__author').last(), 1);
  I.seeElement(locate('.restaurant__author').last());
  const newCustomerName = await I.grabTextFrom(locate('.restaurant__author').last())
  const newCustomerReview = await I.grabTextFrom(locate('.restaurant__message').last())

  assert.strictEqual(customerName, newCustomerName);
  assert.strictEqual(customerReview, newCustomerReview);
});