import { async } from "regenerator-runtime";

const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the restaurant that has been added', async () => {
    favoriteResto.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
    favoriteResto.putRestaurant({ id: 's1knt6za9kkfw1e867' });

    expect(await favoriteResto.getRestaurant('rqdv5juczeskfw1e867'))
      .toEqual({ id: 'rqdv5juczeskfw1e867' });
    expect(await favoriteResto.getRestaurant('s1knt6za9kkfw1e867'))
      .toEqual({ id: 's1knt6za9kkfw1e867' });
    expect(await favoriteResto.getRestaurant('w9pga3s2tubkfw1e867'))
      .toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteResto.putRestaurant({ aProperty: 'property' });

    expect(await favoriteResto.getAllRestaurants())
      .toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteResto.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
    favoriteResto.putRestaurant({ id: 's1knt6za9kkfw1e867' });

    expect(await favoriteResto.getAllRestaurants())
      .toEqual([
        { id: 'rqdv5juczeskfw1e867' },
        { id: 's1knt6za9kkfw1e867' },
      ]);
  });

  it('should remove favorite restaurant', async () => {
    favoriteResto.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
    favoriteResto.putRestaurant({ id: 's1knt6za9kkfw1e867' });
    favoriteResto.putRestaurant({ id: 'w9pga3s2tubkfw1e867' });

    await favoriteResto.deleteRestaurant('rqdv5juczeskfw1e867');

    expect(await favoriteResto.getAllRestaurants())
      .toEqual([
        { id: 's1knt6za9kkfw1e867' },
        { id: 'w9pga3s2tubkfw1e867'},
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteResto.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
    favoriteResto.putRestaurant({ id: 's1knt6za9kkfw1e867' });
    favoriteResto.putRestaurant({ id: 'w9pga3s2tubkfw1e867' });

    await favoriteResto.deleteRestaurant('uewq1zg2zlskfw1e867');

    expect(await favoriteResto.getAllRestaurants())
      .toEqual([
        { id: 'rqdv5juczeskfw1e867' },
        { id: 's1knt6za9kkfw1e867' },
        { id: 'w9pga3s2tubkfw1e867' },
      ]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteResto.putRestaurant({ id: 1, title: 'restaurant a' });
    favoriteResto.putRestaurant({ id: 2, title: 'restaurant abc' });
    favoriteResto.putRestaurant({ id: 3, title: 'restaurant cde' });
    favoriteResto.putRestaurant({ id: 4, title: 'restaurant adefg' });

    expect(await favoriteResto.searchRestaurant('restaurant a')).toEqual([
      { id: 1, title: 'restaurant a' },
      { id: 2, title: 'restaurant abc' },
      { id: 4, title: 'restaurant adefg' },
    ]);
  });
};

export { itActsAsFavoriteRestoModel };