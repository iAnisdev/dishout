<template>
  <div class="page">
    <Menu mode="horizontal" :theme="'dark'" active-name="1">
      <div class="row">
        <h3 class="hearder">
          <Icon type="md-arrow-round-back" size="24" @click="goBack()"/>Order List
        </h3>
        <h3>
          <Icon size="24" @click="drawer = true" type="ios-menu" color="#ffffff"/>
        </h3>
      </div>
    </Menu>
    <div class="container">
      <Tabs>
        <TabPane label="In Coming">
          <div class="container-fluid">
            <div v-for="order in IPOrders" :key="order.id">
              <Card class="order" :bordered="false">
                <div style="text-align:center">
                  <div class="row-end">
                    <Icon type="md-create" size="24" @click="update(order)"/>
                    <!-- 
                    <Icon type="md-trash" size="24" color="#ff0000"  @click="deleteOrder(order)"/>-->
                  </div>
                  <nuxt-link :to="`../order/${order.id}`">
                    <ul class="order">
                      <li class="row">
                        Table No:
                        <span>
                          <b>{{order.table_id}}</b>
                        </span>
                      </li>
                      <li class="row">
                        Time:
                        <span>
                          <b>{{order.time}}</b>
                        </span>
                      </li>
                      <li class="row">
                        Date:
                        <span>
                          <b>{{order.Date}}/{{order.Month }}</b>
                        </span>
                      </li>
                      <li class="row">
                        Total:
                        <span>
                          <b>${{order.price}}</b>
                        </span>
                      </li>
                    </ul>
                  </nuxt-link>
                </div>
              </Card>
              <Divider/>
            </div>
          </div>
          <div class="container-fluid" v-if="!IPOrders.length">
            <Card>
              <div style="text-align:center">
                <h3>No Incoming orders</h3>
              </div>
            </Card>
          </div>
        </TabPane>
        <TabPane label="In progress">
          <div class="container-fluid" v-if="INOrders.length">
            <div v-for="order in INOrders" :key="order.id">
              <Card class="order" :bordered="false">
                <div style="text-align:center">
                  <div class="row-end">
                    <Icon type="md-create" size="24" @click="update(order)"/>
                  </div>
                  <nuxt-link :to="`../order/${order.id}`">
                    <ul class="order">
                      <li class="row">
                        Table No:
                        <span>
                          <b>{{order.table_id}}</b>
                        </span>
                      </li>
                      <li class="row">
                        Time:
                        <span>
                          <b>{{order.time}}</b>
                        </span>
                      </li>
                      <li class="row">
                        Date:
                        <span>
                          <b>{{order.Date}}/{{order.Month }}</b>
                        </span>
                      </li>
                      <li class="row">
                        Total:
                        <span>
                          <b>${{order.price}}</b>
                        </span>
                      </li>
                    </ul>
                  </nuxt-link>
                </div>
              </Card>
              <Divider/>
            </div>
          </div>
          <div class="container-fluid" v-if="!INOrders.length">
            <Card>
              <div style="text-align:center">
                <h3>No in progress orders</h3>
              </div>
            </Card>
          </div>
        </TabPane>
        <TabPane label="Done">
          <div class="container-fluid" v-if="DOOrders.length">
            <div v-for="order in DOOrders" :key="order.id">
              <Card class="order" :bordered="false">
                <div style="text-align:center">
                  <nuxt-link :to="`../order/${order.id}`">
                    <ul class="order">
                      <li class="row">
                        Table No:
                        <span>
                          <b>{{order.table_id}}</b>
                        </span>
                      </li>
                      <li class="row">
                        Time:
                        <span>
                          <b>{{order.time}}</b>
                        </span>
                      </li>
                      <li class="row">
                        Date:
                        <span>
                          <b>{{order.Date}}/{{order.Month }}</b>
                        </span>
                      </li>
                      <li class="row">
                        Total:
                        <span>
                          <b>${{order.price}}</b>
                        </span>
                      </li>
                    </ul>
                  </nuxt-link>
                </div>
              </Card>
              <Divider/>
            </div>
          </div>
          <div class="container-fluid" v-if="!DOOrders.length">
            <Card>
              <div style="text-align:center">
                <h3>No completed orders yet</h3>
              </div>
            </Card>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <Drawer title="Profile Info" placement="left" :closable="false" v-model="drawer">
      <div class="profile">
        <Avatar icon="ios-person" size="large"/>
        <h3 class="name">
          <b>user name</b>
        </h3>
        <h4>user email</h4>
        <Divider/>
        <Menu active-name="1-1" class="menu-side" :open-names="['1']">
          <MenuItem name="0" to="/">
            <Icon type="ios-home"/>Home
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-filing"/>Order List
            </template>
            <MenuItem name="1-1" to="./list">
              <Icon type="md-arrow-down"/>In Coming
            </MenuItem>
            <MenuItem name="1-2" to="./list">
              <Icon type="ios-clock-outline"/>In Progress
            </MenuItem>
            <MenuItem name="1-3" to="./list">
              <Icon type="ios-checkmark-circle-outline"/>Done
            </MenuItem>
          </Submenu>
        </Menu>
      </div>
    </Drawer>
    <Modal
      v-model="updateModel"
      title="Update Order Status"
      ok-text="Update Order"
      @on-ok="updateStatus()"
      width="300"
    >
      <ul class="order">
        <li class="row">
          Table No:
          <span>
            <b>{{targetOrder.table_id}}</b>
          </span>
        </li>
        <li class="row">
          Time:
          <span>
            <b>{{targetOrder.time}}</b>
          </span>
        </li>
        <li class="row">
          Date:
          <span>
            <b>{{targetOrder.Date}}/{{targetOrder.Month }}</b>
          </span>
        </li>
        <li class="row">
          Total:
          <span>
            <b>${{targetOrder.price}}</b>
          </span>
        </li>
        <li class="row">Status:</li>
        <li>
          <Select v-model="currentStatus" style="width:100%">
            <Option value="IN">Incoming</Option>
            <Option value="IP">IN Progress</Option>
            <Option value="DO">Done</Option>
          </Select>
        </li>
      </ul>
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      updateModel: false,
      targetOrder: {},
      currentStatus: ""
    };
  },
  computed: {
    ...mapGetters({
      IPOrders: "getIPOrders",
      INOrders: "getINOrders",
      DOOrders: "getDOOrders"
    })
  },
  methods: {
    ...mapActions({
      getOrderList: "getOrderList",
      updateSpecificOrder: "updateSpecificOrder",
      DeleteSpecificOrder: "DeleteSpecificOrder"
    }),
    update(order) {
      (this.updateModel = true), (this.targetOrder = order);
      this.currentStatus = order.status;
    },
    goBack() {
      this.$router.back();
    },
    updateStatus() {
      let that = this;
      if (that.targetOrder.status == that.currentStatus) {
        console.log("same");
      } else if (
        that.targetOrder.status == "IP" &&
        that.currentStatus == "IN"
      ) {
        this.$Modal.error({
          title: "Not allowed",
          content: "Cannot change In progress status back to incoming"
        });
      } else {
        let data = {
          id: that.targetOrder.id,
          status: that.currentStatus
        };
        that.updateSpecificOrder(data);
      }
    },
    deleteOrder(order) {
      let that = this;
      this.$Modal.error({
        title: "Delete option",
        content: `Are you sure to delete order with id ${order.id}`,
        okText: "Delete",
        onOk: () => {
          let data = {
            that: that,
            id: order.id
          };
          that.DeleteSpecificOrder(data);
        }
      });
    }
  },

  mounted() {
    let that = this;
    that.$Spin.show();
    that.getOrderList(that);
  }
};
</script>

<style scoped>
.page {
  max-width: 100vw;
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
  font-family: "Product Sans";
  min-height: 100vh;
}
.ivu-menu-dark {
  padding: 0px 8vw;
}
.hearder {
  color: white;
}
.container {
  width: 90vw;
  padding-top: 2vh;
  vertical-align: center;
  margin: auto;
}
.container-fluid {
  width: 80vw;
  padding-top: 1vh;
  vertical-align: center;
  margin: auto;
}
.row-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
ul,
ol {
  list-style-type: none;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.order {
  color: #515a6e;
  margin-top: 1vh;
}
</style>
