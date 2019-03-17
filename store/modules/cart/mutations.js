export default {
    get_cart_from_LS: (state) =>{
        let savedCart = localStorage.getItem('cart')
        //state.cart = JSON.stringify(savedCart)
    },
    add_to_cart: (state , item) => {
        state.cart.push(item)
        localStorage.setItem('cart',  JSON.stringify(state.cart))
    },
    update_cart: (state , data) => {
        state.cart = data
        localStorage.setItem('cart',  JSON.stringify(state.cart))
    },
    set_menu: (state , menu_id) => {
        state.order.Menu = menu_id
    },
    clear_cart: (state) => {
        state.cart = []
    },
    set_menu_rest: (state , rest) => {
        state.rest = rest
    }
}