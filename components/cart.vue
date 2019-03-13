<template>
    <footer>
        <h4 class="cart--total">$8.75</h4>
        <h5 class="cart--button">View Cart</h5>
        <h4 class="cart--size">1</h4>
    </footer>
</template>
<script>
export default {
    
}
</script>
<style scoped>
footer{
    width: 100vw;
    position: fixed;
    bottom: 0;
    background-color: green;
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
