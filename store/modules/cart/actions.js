import Api from '@/plugins/Api'

export default {
    getCartFromLS: ({ commit }, data) => {
        commit('get_cart_from_LS')
    },
    addItemToCart: ({ commit }, data) => {
        commit('add_to_cart', data)
    },
    updateCart: ({ commit }, data) => {
        commit('update_cart', data)
    },
    clearCart: ({ commit }, data) => {
        commit('clear_cart')
    },
    setMenu: ({ commit }, data) => {
        commit('set_menu', data)
    },
    setMenuRest: ({ commit }, data) => {
        commit('set_menu_rest', data)
    },
    placeOrder: ({ commit }, data) => {
        let that = data.this
        delete data.this
        console.log(data)
        Api().post('/order/', JSON.stringify(data)).then((res) => {
            console.log(res)
            if (res.status == 200) {
                let order = res.data
                commit('set_order', order)
                commit('is_order_done', true)
                that.$Spin.hide()
                that.$Message.success('order placed successfully');
                that.$router.push({ path: `order/${order.id}` });
            }
        }
        ).catch((err) =>
            console.log('err is ', err.message))
    },
    getSpecificOrder: ({ commit }, data) => {
        Api().get('/order/' + data).then((res) => {
            if (res.status == 200) {
                let order = res.data
                order.Date = order.date.substring(8, 10)
                order.Month = order.date.substring(5, 7)
                order.time = order.date.substring(11, 16)
                commit('set_order', order)
            }
        }
        ).catch((err) =>
            console.log('err is ', err.message))
    },

    updateSpecificOrder: ({ commit }, data) => {
        console.log(data)
        Api().put(`/order/`, data).then((res) => {
            console.log(res)
        }
        ).catch((err) =>
            console.log('err is ', err.message))
    },

    DeleteSpecificOrder: ({ commit }, data) => {
        Api().delete(`/order/${data.id}`).then((res) => {
            console.log(res)
        }
        ).catch((err) =>
            console.log('err is ', err.message))
    },
    getOrderList: ({ commit }, data) => {
        let that = data
        Api().get('/order').then((res) => {
            commit('set_order_list', res.data)
            that.$Spin.hide()
        }
        ).catch((err) => {
            console.log('err is ', err.message)
            that.$Spin.hide()
        })
    },
}