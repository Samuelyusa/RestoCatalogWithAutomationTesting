import { itActsAsFavoriteRestoModel } from "./contract/favoriteRestoContract";

let favoriteResto = [];

const FavoriteRestoArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteResto.find((restaurant) => restaurant.id == id);
  },

  getAllRestaurants() {
    return favoriteResto;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteMovies
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteResto.push(restaurant);
  },

  deleteRestaurant(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteResto = favoriteResto.filter((restaurant) => restaurant.id != id);
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favoriteResto = []);

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});