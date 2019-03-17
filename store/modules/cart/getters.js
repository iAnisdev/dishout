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
    getOrderMenu: state => state.order.Menu
}