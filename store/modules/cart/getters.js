export default {
    getCart: state => state.cart,
    cartSize: state => {
        let size = 0
        state.cart.forEach(item => {
            size += item.quantity
        });
        return size
    },
    cartPrice: state => {
        let total = Number(0)
        state.cart.forEach(item => {
            total += Number(item.price)
        });
        return total
    },
    getOrder: state => state.order,
    getOrderMenu: state => state.order.Menu,
    getOrderRest: state => state.rest,
    getOrderInfo: state => state.orderData,
    getOrderStatus: state => state.isOrderd,
    getIPOrders: (state) => {
        let inOrder = []
        state.orderList.forEach((order) => {
                if(order.status == "IN"){
                    order.Date = order.date.substring(8,10)
                    order.Month = order.date.substring(5,7)
                    order.time = order.date.substring (11,16)
                    inOrder.push(order)
                }
        })
        return inOrder
    },
    getINOrders: (state) => {
        let ipOrders = []
        state.orderList.forEach((order) => {
            if(order.status == "IP"){
                order.Date = order.date.substring(8,10)
                order.Month = order.date.substring(5,7)
                order.time = order.date.substring (11,16)
                ipOrders.push(order)
            }
        })
        return ipOrders
    },
    getDOOrders: (state) => {
        let doOrder = []
        state.orderList.forEach((order) => {
            if(order.status == "DO"){
                order.Date = order.date.substring(8,10)
                order.Month = order.date.substring(5,7)
                order.time = order.date.substring (11,16)
                doOrder.push(order)
            }
        })
        return doOrder
    },
}