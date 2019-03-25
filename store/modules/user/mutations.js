export default {
    set_login_status: (state, status) => {
        state.loggedIn = status
    },
    set_user_obj: (state, obj) => {
        state.userObj = data
    },
    set_auth_token: (state, token) => {
        state.auth_token = token
    },
    set_user_id: (state, id) => {
        state.userId = id
    }
}