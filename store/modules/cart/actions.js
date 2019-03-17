export default {
    getCartFromLS: ({commit}) => {
        commit('get_cart_from_LS')
    },
    addItemToCart: ({commit} , data) => {
        commit('add_to_cart' , data)
    },
    updateCart: ({commit} , data) => {
        commit('update_cart' , data)
    },
    clearCart: ({commit} , data) => {
        commit('clear_cart' ,)
    },
    setMenu: ({commit} , data) => {
        commit('set_menu' , data)
    },
    setMenuRest: ({commit} , data) => {
        commit('set_menu_rest' , data)
    }
}