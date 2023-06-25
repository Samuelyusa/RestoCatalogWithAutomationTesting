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
};

export { itActsAsFavoriteRestoModel };