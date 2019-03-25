import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const defaultState = {
    loggedIn: false,
    userObj: {},
    auth_token: '',
    userId: null
}

const inBrowser = typeof window !== 'undefined';
const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.page : defaultState;

export default {
    state,
    getters,
    mutations,
    actions
}