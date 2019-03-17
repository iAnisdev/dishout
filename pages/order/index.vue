<template>
    <section class="">
    <Menu mode="horizontal" :theme="'dark'" active-name="1">
        <h3 class="hearder">Your Cart</h3>
    </Menu>
    <div class="container">
       <div><h3>{{orderRest}}</h3>
       <div v-for="item in cart" :key="item.id">
           <Card :bordered="false">
            <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="2" class="price">{{item.quantity}}</Col>
            <Col span="14">
                <div>
                    <h5>{{item.name}}</h5>
                    <h6>{{item.radio_options}}</h6>
                    <div v-for="option in item.options" :key="option.id">
                        <h6>{{option.name}} - ${{option.price}}</h6>
                    </div>
                </div>
            </Col>
            <Col span="4">${{item.price}}</Col>
    </Row>
        </Card>
        <Divider />
       </div>
        <Input v-model="note" type="textarea" :rows="2" placeholder="order note..." />
        <Divider />
       </div>
    </div>
     <footer @click="order()">
            <span>Place Order</span>
            <span>${{cartPrice}}</span>
        </footer>
    </section>
</template>
<script>
import { mapGetters , mapActions } from 'vuex'
export default {
    data(){
        return{
            note: '',
            iconModel: true
        }
    },
    computed: {
        ...mapGetters({
            cart: 'getCart',
            cartPrice: 'cartPrice',
            cartSize: 'cartSize',
            orderMenu: 'getOrderMenu',
            orderRest: 'getOrderRest'
        }),
        },
        methods: {
            ...mapActions({
                placeOrder: 'placeOrder'
            }),
            order(){
                let that = this
                let  updated_cart = []
                that.cart.forEach(item => {
                    let new_item = {
                        item: item.id,
                        options: [],
                        radio_options: [1],
                        quantity: item.quantity
                    }
                    if(item.options){
                        item.options.forEach(function(option){
                            new_item.options.push(option.id)
                        })
                    }
                    updated_cart.push(new_item)
                });
               let order = {
                   menu: Number(that.orderMenu),
                   customer: 1,
                   table_id: '1',
                   items: updated_cart
               }
               that.placeOrder(order)
            }
        }
}
</script>
<style scoped>
.ivu-menu{
    padding: 0px 8vw;
}
.hearder{
    color: white;
}
.container{
    width: 80vw;
    padding-top: 2vh;
    margin: auto;
}
.price{
    text-align: center;
    align-content: center;
    color: #19be6b;
}
 .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
}
footer{
    width: 100vw;
    position: fixed;
    bottom: 0;
    color: white;
    background-color: #19be6b;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 20vw
}
</style>
