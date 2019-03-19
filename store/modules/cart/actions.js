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
            commit('set_order' , order)
            commit('is_order_done' , true)
            that.$Spin.hide()
            that.$Message.success('order placed successfully');
            that.$router.push({path: `order/${order.id}`});
        }
        }
        ).catch((err) => 
        console.log('err is ' ,err.message))
    },
    getSpecificOrder:  ({commit} , data) => {
        let  headers = {
        'Authorization': 'Token 5822cd005a14cf7212bffb51c2bab69d87460dae',
        'Content-Type': 'application/json'
        }
        Api().get('/order/'+data , {headers : headers}).then((res) =>{
        if(res.status == 200){
            let order = res.data
            order.Date = order.date.substring(8,10)
            order.Month = order.date.substring(5,7)
            order.time = order.date.substring (11,16)
            commit('set_order' , order)
        }
        }
        ).catch((err) => 
        console.log('err is ' ,err.message))
    },
    getOrderList: ({commit} , data) => {
        let that = data
        let  headers = {
        'Authorization': 'Token 5822cd005a14cf7212bffb51c2bab69d87460dae',
        'Content-Type': 'application/json'
        }
        Api().get('/order', {headers : headers}).then((res) =>{
            commit('set_order_list' , res.data)
            that.$Spin.hide()
        }
        ).catch((err) => {
            console.log('err is ' ,err.message)
            that.$Spin.hide()
        })
    },
}