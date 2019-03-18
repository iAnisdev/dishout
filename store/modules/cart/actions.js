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
    placeOrder: ({commit} , data) => {
        let that = data.this
        delete data.this
        let  headers = {
        'Authorization': 'Token 5822cd005a14cf7212bffb51c2bab69d87460dae',
        'Content-Type': 'application/json'
        }
        Api().post('/order/', JSON.stringify(data)  , {headers : headers}).then((res) =>{
        if(res.status == 200){
            let order = res.data
            order.Date = order.date.substring(0,10)
            order.time = order.date.substring (11,19)
            commit('set_order' , order)
            commit('is_order_done' , true)
            that.$Message.success('order placed successfully');
            that.$router.push({path: 'order/info'});
        }
        }
        ).catch((err) => 
        console.log('err is ' ,err.message))
    }
}