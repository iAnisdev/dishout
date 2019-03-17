import Vuex from 'vuex';
import restaurant from './modules/restaurant';
import cart from './modules/cart';

const store = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
        restaurant,
        cart
    }
  });
};

export default store