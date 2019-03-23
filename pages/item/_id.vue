<template>
   <div class="page">
    <Icon type="md-arrow-round-back" size="36" class="icon--back" @click="goBack()"/> 
      <div class="bg">
         <img class="bg--image" :src="item.img_url"/>
      </div>
      <div >
      <Card :bordered="false">
        <div class="content">
             <h1>{{item.name}}</h1>
            <h3> ${{item.price}}</h3>
            <p class="text-justify">{{item.description}}</p>
        </div>
      </Card>
      </div>
         <div v-for="group in item.radio_option_groups" :key="group.id">
            <Card style="margin-top: 2vh" :bordered="false">
                   <p slot="title">
                  {{group.description}}
               </p>
               <p  slot="extra" v-if="group.min_selectable && !selected"> <Tag color="default">Required</Tag></p>
               <p  slot="extra" v-if="group.min_selectable && selected"><Icon type="ios-checkmark-circle" color="#19be6b" size="24" /></p> 
               <RadioGroup v-model="modifier" vertical v-for="option in group.options" :key="option.id" >
                  <Radio :label="option.name" size="large">
                     <span class="option">{{option.name}}</span>
                  </Radio>
                  <Divider />
               </RadioGroup>
            </Card>
            <Card style="margin-top: 2vh" :bordered="false">
               <p slot="title">condiments</p>
               <CheckboxGroup v-model="condiments" v-for="option in item.options" :key="option.id">
                  <Checkbox :label="option.name" size="large">
                     <h4 style="text-algn: left; left:0;">{{option.name}}</h4>
                     <span></span>
                     <span></span>
                     <span></span>
                     <h4>+${{option.price}}</h4>
                  </Checkbox>
                  <Divider />
               </CheckboxGroup>
            </Card>
         </div>
      </Card>
      <div class="row-center">
        <Card :bordered="false">
        <Button class="btn" icon="md-remove"  @click="remQuantity()"></Button>
        <span class="quantity">{{quantity}}</span>
        <Button class="btn"  icon="md-add" @click="addQuantity()"></Button>
        </Card>
      </div>
      <footer>
         <Button type="success" long @click="addtoCart(item)">
            <div class="justify-center">
               <h2>Add 1 to cart</h2>
               <h2>${{price || item.price}}</h2>
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
            selected: false,
            condiments_Arr: [],
            condiments: [],
            quantity: 1
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
            that.$Spin.show()
            let menu_id = this.$route.query.menu
            let restaurant = this.$route.query.restaurant
            if (item.radio_option_groups.length > 0 && that.modifier == '') {
                that.$Spin.hide()
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
                        quantity: that.quantity,
                        price: that.price * that.quantity || item.price * that.quantity,
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
                            that.$Spin.hide()
                            that.updateCart(updated_cart)
                            this.$Message.success(`item updated`);
                            this.$router.back()
                        } else {
                            that.$Spin.hide()
                            that.addItemToCart(selected_item)
                            this.$Message.success(`item added`);
                            this.$router.back()
                        }
                    } else {
                        that.$Spin.hide()
                        that.addItemToCart(selected_item)
                        this.$Message.success(`item added`);
                        this.$router.back()
                    }
                } else {
                    this.$Modal.confirm({
                        title: 'Order from one Menu',
                        content: '<p>You can only order from on menu at a time , Clear your cart if you would like to order this item</p>',
                        okText: 'Clear Cart',
                        cancelText: 'Cancel',
                        loading: true,
                        onOk: () => {
                            that.$Spin.hide()
                            that.clearCart()
                            that.setMenu(menu_id)
                            that.setMenuRest(restaurant)
                            that.addtoCart(item)
                            this.$Modal.remove()
                            this.$router.back()
                        },
                        onCancel: () => {
                            that.$Spin.hide()
                        }
                    });
                }
            }
            that.$Spin.hide()
        },
        goBack(){
            this.$router.back()
        },
        addQuantity(){
            this.quantity++
        },
        remQuantity(){
            if(this.quantity > 1){
                this.quantity--;
            }else{
                this.$Message.error(`quantity must be 1`);
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
        },
        modifier(newVal , oldVal) {
            if(newVal) {
                this.selected = true
            }
        }
    },
    mounted() {
        let that = this
        that.$Spin.show()
        let id = this.$route.params.id
        this.getSpecificItem({id  , that })
    },
    destroyed() {
        this.clearItem()
    },
}
</script>
<style scoped>
.page{
    max-width: 100vw;
    padding-bottom: 8vh;
   font-family: 'Product Sans';
    background: linear-gradient(#f5f5f5 , #f6f6f6 , #f7f7f7 , #f8f8f8 , #f9f9f9 , #fafafa , #fbfbfb , #fcfcfc , #fdfdfd ,#fefefe , #ffffff);
}
.bg{
    text-align: center;
}
.bg--image{
    width: 100%;
    max-height: 35vh;
}
.itemInfo{
    width: 90%;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: -8vh;
    box-shadow: 1px 1px 1px 1px #d3d3d3;
    margin-top: -10vh;
}
.content{
    padding: 1px 1vw 2vh 1vw;
}
.text-justify{
    margin-top: 2px;
    text-align: justify;
}
.ivu-radio-group{
    display: block;
}
.ivu-checkbox-group-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.option{
    font-size: 14px;
    font-weight: bold;
    padding-left: 5vw;
}
.row-center{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    align-items: center;
}
.justify-center{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    align-items: center;
    padding: 0px 3vw 0px 22vw;
}
.head{
    background-color: #e8eaec;
}
.icon--back{
    position: absolute;
    left: 0;
    color: white;
    padding: 24px;
}
.quantity{
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    align-content: center;
    align-self: center;
    margin-top: 8px;
    padding: 4px 20px 1px 20px;
}
.btn{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    align-content: center;
    align-self: center;
}
footer{
    width: 100vw;
    position: fixed;
    bottom: 0;
    color: white;
    background-color: #19be6b;
    font-size: 32px;
    font-weight: bold;
}
</style>
