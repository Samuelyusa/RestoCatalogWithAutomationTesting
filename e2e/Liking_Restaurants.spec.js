Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', ({I}) => {
  I.see('Restaurant tidak ditemukan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item', 5);
  I.seeElement('.restaurant-item');
  I.waitForClickable('.restaurant__title a',6);
  I.click(locate('.restaurant__title a').first());

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  



});