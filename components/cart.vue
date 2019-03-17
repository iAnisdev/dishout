<template>
   <nuxt-link to="/order">
        <footer v-if="show">
        <h4 class="cart--total">${{cartPrice}}</h4>
        <h5 class="cart--button">View Cart</h5>
        <h4 class="cart--size">{{cartSize}}</h4>
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
    watch: {
        cart(newVal){
            console.log('changed' , newVal)
        }
    }
}
</script>
<style scoped>
footer{
    width: 100vw;
    position: fixed;
    bottom: 0;
    background-color: #19be6b;
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 16px;
    padding: 1vh 4vw;
}
.cart--total{
    align-self: center;
}
.cart--button{
    align-self: center;
}
.cart--size{
    border: 1px solid white;
    padding: 1px 2vw;
    align-self: center;
    font-size: 12px;
}
</style>
