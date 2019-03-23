import Vuex from 'vuex';
import restaurant from './modules/restaurant';
import cart from './modules/cart';
import item from './modules/item';

const store = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
        restaurant,
        cart,
        item
    }
  });
};

export default store