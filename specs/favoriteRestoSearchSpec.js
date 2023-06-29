import FavoriteRestoSearchPresenter from "../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe('Searching restaurant', () => {
  let presenter;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    document.body.innerHTML = `
      <div id="restaurant-search-container">
        <input id="query" type="text">
        <div class="restaurant-result-container">
          <ul class="restaurants">
            <li class="restaurant">
              <span class="restaurant__title">Restaurant Satu</span>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  const constructPresenter = () => {
    spyOn(FavoriteRestaurantIdb, 'searchRestaurant');
    presenter = new FavoriteRestoSearchPresenter({ favoriteRestaurant: FavoriteRestaurantIdb });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  it('should be able to capture the query typed by the user', () => {
    searchRestaurant('restaurant a');

    expect(presenter.latestQuery).toEqual('restaurant a');
  });

  it('should ask the model to search for liked restaurants', () => {
    searchRestaurant('restaurant a');

    expect(FavoriteRestaurantIdb.searchRestaurant)
        .toHaveBeenCalledWith('restaurant a');
  });

  it('should show the found restaurants', () => {
    presenter._showFoundRestaurant([{ id: 1 }]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(1);

    presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }]);
    expect(document.querySelectorAll('.restaurant').length).toEqual(2);
  });

  it('should show the title of the found restaurants', () => {
    presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
        .toEqual('Satu');
  });

  it('should show the title of the found restaurants', () => {
    presenter._showFoundRestaurant([{ id: 1, title: 'Satu' }]);
    expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
        .toEqual('Satu');
    presenter._showFoundRestaurant(
        [{ id: 1, title: 'Satu' }, { id: 2, title: 'Dua' }],
    );
    const restaurantTitles = document.querySelectorAll('.restaurant__title');
    expect(restaurantTitles.item(0).textContent).toEqual('Satu');
    expect(restaurantTitles.item(1).textContent).toEqual('Dua');
  });

  it('should show - for found restaurant without title', () => {
    presenter._showFoundRestaurant([{ id: 1 }]);
    expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
        .toEqual('-');
  });

  it('should show the restaurants found by Favorite Restaurants', (done) => {
    document.getElementById('restaurant-search-container')
      .addEventListener('restaurants:searched:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(3);
        done()
      });
    
    FavoriteRestaurantIdb.searchRestaurant.withArgs('restaurant a').and.returnValues([
      { id: 111, title: 'restaurant a' },
      { id: 112, title: 'restaurant b' },
      { id: 113, title: 'restaurant c' },
    ]);

    searchRestaurant('restaurant a');
  });

  it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
  document.getElementById('restaurant-search-container').addEventListener('restaurants:searched:updated', () => {
    const restaurantTitles = document.querySelectorAll('.restaurant__title');
    expect(restaurantTitles.item(0).textContent).toEqual('restaurant a');
    expect(restaurantTitles.item(1).textContent).toEqual('restaurant b');
    expect(restaurantTitles.item(2).textContent).toEqual('restaurant c');

    done();
  });

  FavoriteRestaurantIdb.searchRestaurant.withArgs('restaurant a').and.returnValues([
    { id: 111, title: 'restaurant a' },
    { id: 112, title: 'restaurant b' },
    { id: 113, title: 'restaurant c' },
  ]);

  searchRestaurant('restaurant a');
});
});