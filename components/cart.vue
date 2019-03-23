<template>
   <nuxt-link to="/order">
        <footer v-if="show">
            <h4 class="cart--button">View Cart</h4>
        <h2 class="cart--size">{{cartSize}}</h2>
    </footer>
   </nuxt-link>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            
        }
    },
    computed: {
       ...mapGetters({
        cart: 'getCart',
        cartPrice: 'cartPrice',
        cartSize: 'cartSize'
    }),
    show(){
        return this.cart.length > 0
    }
    },
}
</script>
<style scoped>
footer{
    width: 100vw;
    position: fixed;
    font-family: 'Product Sans';
    bottom: 0;
    background-color: #19be6b;
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 16px;
    padding: 1vh 0px 1vh 30vw;
}
.row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.cart--total{
    align-self: center;
}
.cart--button{
    align-self: center;
}
.cart--size{
    border: 2px solid white;
    padding: 1px 2vw;
    align-self: center;
    font-size: 12px;
}
</style>
