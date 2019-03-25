<template>
  <section class="page">
    <Menu mode="horizontal" active-name="1">
      <h3 class="hearder">
        <Icon type="md-arrow-round-back" size="24" @click="goBack()"/>Your Cart
      </h3>
    </Menu>
    <div class="container">
      <div>
        <h2>{{orderRest}}</h2>
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
          <Divider/>
        </div>
        <Input v-model="note" type="textarea" :rows="2" placeholder="order note..."/>
      </div>
    </div>
    <footer @click="order()">
      <div class="justify-center">
        <h1>Place Order</h1>
        <h1>${{cartPrice}}</h1>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      note: ""
    };
  },
  computed: {
    ...mapGetters({
      cart: "getCart",
      cartPrice: "cartPrice",
      cartSize: "cartSize",
      orderMenu: "getOrderMenu",
      orderRest: "getOrderRest",
      orderInfo: "getOrderInfo",
      orderStatus: "getOrderStatus"
    })
  },
  methods: {
    ...mapActions({
      placeOrder: "placeOrder"
    }),
    order() {
      let that = this;
      this.$Spin.show();
      let updated_cart = [];
      that.cart.forEach(item => {
        let new_item = {
          item: item.id,
          options: [],
          radio_options: [],
          quantity: item.quantity
        };
        if (item.options) {
          item.options.forEach(function(option) {
            new_item.options.push(option.id);
          });
        }
        if (item.radio_options) {
          item.radio_option_arr.forEach(group => {
            group.options.forEach(optn => {
              if (optn.name === item.radio_options) {
                new_item.radio_options.push(optn.id);
              }
            });
          });
        }
        updated_cart.push(new_item);
      });
      let order = {
        menu: Number(that.orderMenu),
        customer: 3,
        table_id: 1,
        items: updated_cart,
        this: that
      };
      that.placeOrder(order);
    },
    ok() {
      this.$router.back();
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.page {
  font-family: "Product Sans";
  background: linear-gradient(
    #f5f5f5,
    #f6f6f6,
    #f7f7f7,
    #f8f8f8,
    #f9f9f9,
    #fafafa,
    #fbfbfb,
    #fcfcfc,
    #fdfdfd,
    #fefefe,
    #ffffff
  );
}
.ivu-menu {
  padding: 0px 8vw;
  background-color: #f8f9fa;
}
.container {
  width: 80vw;
  padding-top: 2vh;
  margin: auto;
}
.price {
  text-align: center;
  align-content: center;
  color: #19be6b;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.justify-center {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  align-content: center;
  align-items: center;
  padding: 1vh 1vw 1vh 30vw;
}
footer {
  width: 100vw;
  position: fixed;
  bottom: 0;
  color: white;
  background-color: #19be6b;
  padding: 1vh auto 1vh auto;
  font-weight: bold;
}
</style>
