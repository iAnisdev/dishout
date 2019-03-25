import Vuex from 'vuex';
import restaurant from './modules/restaurant';
import cart from './modules/cart';
import item from './modules/item';
import user from './modules/user'

const store = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      restaurant,
      cart,
      item,
      user
    }
  });
};

export default store