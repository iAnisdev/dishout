<template>
   <div>
      <Menu mode="horizontal" :theme="'dark'" active-name="1">
         <h3 class="hearder"> <Icon size="24" @click="drawer = true" type="ios-menu" color="#ffffff"/> Order List</h3>
               
      </Menu>
      <div class="container">
         <Tabs >
            <TabPane label="In Coming">
               <div class="container-fluid">
                  <div v-for="order in IPOrders" :key="order.id">
                     <nuxt-link :to="`../order/${order.id}`" >
                        <Card class="order" :bordered="false">
                           <div style="text-align:center">
                              <ul>
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
                                    <b>{{order.Date}}</b>
                                    </span>
                                 </li>
                                 <li class="row">
                                    Total:
                                    <span>
                                    <b>${{order.price}}</b>
                                    </span>
                                 </li>
                              </ul>
                           </div>
                        </Card>
                     </nuxt-link>
                     <Divider />
                  </div>
               </div>
               <div class="container-fluid" v-if="!IPOrders.length">
                  <Card >
                     <div style="text-align:center">
                        <h3>No in progress orders</h3>
                     </div>
                  </Card>
               </div>
            </TabPane>
            <TabPane label="In progress">
               <div class="container-fluid" v-if="INOrders.length">
                  <div v-for="order in INOrders" :key="order.id">
                     <nuxt-link :to="`../order/${order.id}`" >
                        <Card class="order" :bordered="false">
                           <div style="text-align:center">
                              <ul>
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
                                    <b>{{order.Date}}</b>
                                    </span>
                                 </li>
                                 <li class="row">
                                    Total:
                                    <span>
                                    <b>${{order.price}}</b>
                                    </span>
                                 </li>
                              </ul>
                           </div>
                        </Card>
                     </nuxt-link>
                     <Divider />
                  </div>
               </div>
               <div class="container-fluid" v-if="!INOrders.length">
                  <Card >
                     <div style="text-align:center">
                        <h3>No Incoming orders</h3>
                     </div>
                  </Card>
               </div>
            </TabPane>
            <TabPane label="Done">
               <div class="container-fluid" v-if="DOOrders.length">
                  <div v-for="order in DOOrders" :key="order.id">
                     <nuxt-link :to="`../order/${order.id}`" >
                        <Card class="order" :bordered="false">
                           <div style="text-align:center">
                              <ul>
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
                                    <b>{{order.Date}}</b>
                                    </span>
                                 </li>
                                 <li class="row">
                                    Total:
                                    <span>
                                    <b>${{order.price}}</b>
                                    </span>
                                 </li>
                              </ul>
                           </div>
                        </Card>
                     </nuxt-link>
                     <Divider />
                  </div>
               </div>
               <div class="container-fluid" v-if="!DOOrders.length">
                  <Card >
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
            <Avatar icon="ios-person" size="large" />
            <h3 class="name"><b>user name</b></h3>
            <h4>user email</h4>
            <Divider />
            <Menu active-name="1-1" class="menu-side" :open-names="['1']">
               <Submenu name="0" to="../index">
                  <template slot="title">
                     <Icon type="ios-home" />
                     Home
                  </template>
               </Submenu>
               <Submenu name="1">
                  <template slot="title">
                     <Icon type="ios-filing" />
                     Order List
                  </template>
                  <MenuItem name="1-1" to="./list">
                     <Icon type="md-arrow-down" />
                     In Coming</MenuItem>
                  <MenuItem name="1-2" to="./list">
                     <Icon type="ios-clock-outline" />
                     In Progress
                  </MenuItem>
                  <MenuItem name="1-3" to="./list">
                     <Icon type="ios-checkmark-circle-outline" />
                     Done
                  </MenuItem>
               </Submenu>
            </Menu>
         </div>
      </Drawer>
   </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
      data(){
        return {
           drawer: false
        }
    },
    computed: {
     ...mapGetters({
         IPOrders: 'getIPOrders',
         INOrders: 'getINOrders',
         DOOrders: 'getDOOrders'
        }),
    },
    methods: {
        ...mapActions({
            getOrderList: 'getOrderList'
        })
    },
    mounted(){
        let that = this
        that.$Spin.show()
        that.getOrderList(that)
    }
}
</script>

<style scoped>
.ivu-menu-dark{
    padding: 0px 8vw;
}
.hearder{
    color: white;
}
.container{
    width: 90vw;
    padding-top: 2vh;
    vertical-align: center;
    margin: auto;
}
.container-fluid{
    width: 80vw;
    padding-top: 2vh;
    vertical-align: center;
    margin: auto;
}
ul , ol {
    list-style-type: none;
}
.row{
    display: flex;
    flex-direction: row;
    justify-content: space-between
}
.order{
    color: #515a6e;
    margin-top: 1vh;
}
</style>
