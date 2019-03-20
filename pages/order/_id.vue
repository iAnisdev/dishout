<template>
   <div>
      <Menu mode="horizontal" active-name="1">
         <div class="row">
            <h3 class="hearder">Order Info</h3>
            <h4>
               <Icon size="24"  @click="drawer = true" type="ios-menu" color="#ffffff"/>
            </h4>
         </div>
      </Menu>
      <div class="container">
         <Card :bordered="false">
            <p slot="title">
               Order status
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
               <Tag color="default" v-if="orderInfo.status == 'IN'">Incoming</Tag>
               <Tag color="primary" v-if="orderInfo.status == 'IP'">in progress</Tag>
               <Tag color="success" v-if="orderInfo.status == 'DO'">Done</Tag>
            </a>
            <div >
             
               <ul>
                  <li class="row">
                     Table No:
                     <span>
                     <b>{{orderInfo.table_id}}</b>
                     </span>
                  </li>
                  <li class="row">
                     Order id:
                     <span>
                     <b>{{orderInfo.id}}</b>
                     </span>
                  </li>
                  <li class="row">
                     Time:
                     <span>
                     <b>{{orderInfo.time}}</b>
                     </span>
                  </li>
                  <li class="row">
                     Date:
                     <span>
                     <b>{{orderInfo.Date}}/{{orderInfo.Month }}</b>
                     </span>
                  </li>
                  <li class="row">
                     Total:
                     <span>
                     <b>${{orderInfo.price}}</b>
                     </span>
                  </li>
                  <li>
                     Items :
                  </li>
                  <li>
                     <ol >
                        <li  v-for="item in orderInfo.items" :key="item.id">
                           <Card style="margin-top: 1vh; box-shadow: none;" :bordered="false">
                              <div  class="row">
                                 <span>Item Name: </span>
                                 <b>{{item.item.name }}</b>
                              </div>
                              <div  class="row">
                                 <span>Item Qty: </span>
                                 <b>{{item.quantity }}</b>
                              </div>
                              <ul>
                                 <li v-for="radio in item.radio_options" :key="radio.id">
                                    <b>{{radio.name}}</b>
                                 </li>
                              </ul>
                              <ul>
                                 <li v-for="option in item.options" :key="option.id">
                                    <div  class="row">
                                       <span>{{option.name}} </span>
                                       <b>+${{option.price}}</b>
                                    </div>
                                 </li>
                              </ul>
                           </Card>
                        </li>
                     </ol>
                  </li>
               </ul>
            </div>
         </Card>
      </div>
      <Drawer title="Profile Info" placement="left" :closable="false" v-model="drawer">
         <div class="profile">
            <Avatar icon="ios-person" size="large" />
            <h3 class="name"><b>user name</b></h3>
            <h4>user email</h4>
            <Divider />
            <Menu active-name="1-1" class="menu-side" :open-names="['1']">
                <MenuItem name="1" to="../">
                <Icon type="ios-home" />
                Home
            </MenuItem>
               <Submenu name="1">
                  <template slot="title">
                     <Icon type="ios-filing" />
                     Order List
                  </template>
                  <MenuItem name="1-1" to="./list">
                     <Icon type="md-arrow-down" />
                     In Coming
                  </MenuItem>
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
            orderInfo: 'getOrderInfo',
            orderStatus: 'getOrderStatus'
        }),
    },
    methods: {
       ...mapActions({
          getSpecificOrder: 'getSpecificOrder'
       })
    },
    mounted(){
       let that = this 
       let id = this.$route.params.id 
       that.getSpecificOrder(id)
    }
}
</script>
<style scoped>
.page{
    max-width: 100vw;
    background: linear-gradient(#eee, #fff);
    min-height: 100vh;
}
.ivu-menu{
    padding: 0px 8vw;
    background-color: #f8f9fa;
}
.ivu-card{
    box-shadow: 1px 1px 1px 1px #d3d3d3;
}
.container{
    width: 80vw;
    padding-top: 2vh;
    vertical-align: center;
    margin: auto;
    padding-bottom: 5vh;
}
.container-fluid{
    width: 70vw;
}
.row-end{
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
}
ul , ol {
    list-style-type: none;
}
.row{
    display: flex;
    flex-direction: row;
    justify-content: space-between
}
</style>

