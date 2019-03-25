import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const defaultState = {
  cart: [],
  order: {
    Menu: null
  },
  rest: '',
  orderData: {},
  isOrderd: false,
  orderList: []
}

const inBrowser = typeof window !== 'undefined';
const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.page : defaultState;

export default {
  state,
  actions,
  mutations,
  getters
}
