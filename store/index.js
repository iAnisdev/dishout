import Vuex from 'vuex';
import restaurant from './modules/restaurant';

const store = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
        restaurant
    }
  });
};

export default store