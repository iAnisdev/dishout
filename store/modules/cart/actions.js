import Api from '@/plugins/Api'

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
    },
    placeOrder: ({} , data) => {
        let  headers = {
        'Authorization': 'Token 5822cd005a14cf7212bffb51c2bab69d87460dae',
        'Content-Type': 'application/json'
        }
        console.log(data)
        Api().post('/order' , {headers : headers} , data ).then((res) =>
        console.log(res)
        ).catch((err) => 
        console.log('err is ' ,err.message))
    }
}