export default {
    isLoggedIn: state => state.loggedIn,
    user: state => state.userObj,
    Token: state => state.auth_token,
    getId: state => state.userId
}