<template>
   <div class="page">
      <div class="bg">
         <img class="bg--image" :src="item.img_url"/>
      </div>
      <div class="content">
         <h3>{{item.name}}</h3>
         <h4> ${{item.price}}</h4>
         <p class="text-justify">{{item.description}}</p>
         <div v-for="group in item.radio_option_groups" :key="group.id">
            <Card style="margin-top: 2vh">
               <p slot="title">
                  {{group.description}}
               </p>
               <p  slot="extra"> Min: <b>{{group.min_selectable}}</b></p>
               <RadioGroup v-model="modifier" vertical v-for="option in group.options" :key="option.id">
                  <Radio :label="option.name">
                     <span>{{option.name}}</span>
                  </Radio>
               </RadioGroup>
            </Card>
            <Card style="margin-top: 2vh">
               <p slot="title">condiments</p>
               <CheckboxGroup v-model="condiments" v-for="option in item.options" :key="option.id">
                  <Checkbox :label="option.name">
                     <span style="text-algn: left;">{{option.name}}</span>
                     <span></span>
                     <span></span>
                     <span></span>
                     <span>+${{option.price}}</span>
                  </Checkbox>
               </CheckboxGroup>
            </Card>
         </div>
      </div>
      <footer>
         <Button type="success" long @click="addtoCart(item)">
            <div class="justify-center">
               <span>Add 1 to cart</span>
               <span>${{price || item.price}}</span>
            </div>
         </Button>
      </footer>
   </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    components: {},
    data() {
        return {
            price: null,
            modifier: '',
            condiments_Arr: [],
            condiments: []
        }
    },
    computed: {
        ...mapGetters({
            item: 'getItem',
            cart: 'getCart',
            cartPrice: 'cartPrice',
            cartSize: 'cartSize',
            orderMenu: 'getOrderMenu',
            orderRest: 'getOrderRest'
        }),

        show() {
            return this.cart.length > 0
        }
    },
    methods: {
        ...mapActions({
            getSpecificItem: 'getSpecificItem',
            addItemToCart: 'addItemToCart',
            clearItem: 'clearItem',
            updateCart: 'updateCart',
            setMenu: 'setMenu',
            clearCart: 'clearCart',
            setMenuRest: 'setMenuRest'
        }),
        addtoCart(item) {
            let that = this
            let menu_id = this.$route.query.menu
            let restaurant = this.$route.query.restaurant
            if (item.radio_option_groups.length > 0 && that.modifier == '') {
                this.$Message.error(`Please ${item.radio_option_groups[0].description} first`);
            } else {
                if (that.orderMenu == null || that.orderMenu == menu_id) {
                    if (that.orderMenu == null) {
                        that.setMenu(menu_id)
                        that.setMenuRest(restaurant)
                    }
                    let selected_item = {
                        name: item.name,
                        id: item.id,
                        quantity: 1,
                        price: that.price || item.price,
                        basePrice: that.price || item.price,
                        options: that.condiments_Arr,
                        radio_option_arr: item.radio_option_groups,
                        radio_options: that.modifier
                    }
                    if (that.cart.length > 0) {
                        let updated_cart = that.cart
                        let filtered_item = updated_cart.filter((cart_item) => {
                            return cart_item.id == item.id
                        })
                        if (filtered_item.length > 0) {
                            updated_cart.forEach((cart_item) => {
                                if (filtered_item[0].id == cart_item.id) {
                                    cart_item.quantity++
                                    cart_item.price = cart_item.basePrice * cart_item.quantity
                                }
                            })
                            that.updateCart(updated_cart)
                            this.$Message.success(`item updated`);
                        } else {
                            that.addItemToCart(selected_item)
                            this.$Message.success(`item added`);
                        }
                    } else {
                        that.addItemToCart(selected_item)
                        this.$Message.success(`item added`);
                    }
                } else {
                    this.$Modal.confirm({
                        title: 'Order from one Menu',
                        content: '<p>You can only order from on menu at a time , Clear your cart if you would like to order this item</p>',
                        okText: 'Clear Cart',
                        cancelText: 'Cancel',
                        loading: true,
                        onOk: () => {
                            that.clearCart()
                            that.setMenu(menu_id)
                            that.setMenuRest(restaurant)
                            that.addtoCart(item)
                            this.$Modal.remove()
                        },
                        onCancel: () => {}
                    });
                }
            }
        }
    },
    watch: {
        condiments(newVal, oldVal) {
            let that = this
            if (newVal.length > 0) {
                that.condiments_Arr = []
                newVal.forEach(cond => {
                    that.item.options.forEach(function(option) {
                        if (option.name == cond) {
                            that.condiments_Arr.push(option)
                            let newPrice = that.item.price
                            let uniqueArray = that.condiments_Arr.filter(function(item, pos) {
                                return that.condiments_Arr.indexOf(item) == pos;
                            })
                            uniqueArray.forEach(function(uniq) {
                                newPrice = Number(newPrice) + Number(uniq.price)
                            })
                            that.condiments_Arr = uniqueArray
                            that.price = newPrice
                        }
                    })
                });
            } else {
                that.condiments_Arr = []
                that.price = that.item.price
            }
        }
    },
    mounted() {
        let that = this
        let params = this.$route.params
        this.getSpecificItem(params.id)
    },
    destroyed() {
        this.clearItem()
    }
}
</script>
<style scoped>
.page{
    max-width: 100vw;
    padding-bottom: 6vh;
}
.bg{
    text-align: center;
}
.bg--image{
    width: 100%;
    max-height: 35vh;
}
.content{
    padding: 2vh 5vw;
}
.text-justify{
    margin-top: 2px;
    text-align: justify;
}
.ivu-collapse {
    margin-top: 2vh;
}
.ivu-radio-group{
    display: block;
}
.min{
    margin-right: 5vw;
    float: right;
    font-weight: bold;
}
.ivu-checkbox-group-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.justify-center{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1px 20vw
}
footer{
    width: 100vw;
    position: fixed;
    bottom: 0;
    color: white;
    background-color: #19be6b;
    font-weight: bold;
    font-size: 16px;
}
</style>
