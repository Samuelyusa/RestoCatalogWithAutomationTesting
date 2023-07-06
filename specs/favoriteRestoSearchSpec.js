import FavoriteRestoSearchPresenter from "../src/scripts/views/pages/liked-resto/favorite-resto-search-presenter";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import FavoriteRestaurantSearchView from "../src/scripts/views/pages/liked-resto/favorite-resto-search-view";

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestoSearchPresenter({ favoriteRestaurants, view });
  };

  beforeEach(() => {
    setRestoSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      searchRestaurant('restaurant a');

      expect(favoriteRestaurants.searchRestaurant)
        .toHaveBeenCalledWith('restaurant a');
    });

    it('should show the restaurants found by Favorite Restaurants', () => {
      presenter._showFoundRestaurant([{ id: 111 }]);
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(1);

      presenter._showFoundRestaurant([{
        id: 111, name: 'restaurant a',
      }, { id: 112, name: 'restaurant b'
        }]);
      
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
    });  
    
    it('should show the title of the found restaurants', () => {
        presenter._showFoundRestaurant([{ id: 1, name: 'Satu' }]);
        expect(document.querySelectorAll('.restaurant__title').item(0).textContent)
            .toEqual('Satu');
      });
    
    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');
    
        done();
      });
    
      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 111 },
      ]);
    
      searchRestaurant('restaurant a');
    });

      it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('restaurant a');
        expect(restaurantTitles.item(1).textContent).toEqual('restaurant b');
        expect(restaurantTitles.item(2).textContent).toEqual('restaurant c');

        done();
      });

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant a' },
        { id: 112, name: 'restaurant b' },
        { id: 113, name: 'restaurant c' },
      ]);

      searchRestaurant('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurant(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurant('    ');
      expect(favoriteRestaurants.getAllRestaurants)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
          });

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([]);

      searchRestaurant('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(0);
        done();
      });
      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([]);
      searchRestaurant('restaurant a');
    });
  });
});