<template>
    <div>
       <Menu mode="horizontal" :theme="'dark'" active-name="1">
         <h3 class="hearder">Order Info</h3>
      </Menu>
       <div class="container">
           <Card>
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
                   <b>{{orderInfo.Date}}</b>
                </span>
            </li>
            <li class="row">
                Total:
                <span>
                   <b>${{orderInfo.price}}</b>
                </span>
            </li>
             <li>
                 Items:
             </li>
             <li>
                 <ol >
                     <li  v-for="item in orderInfo.items" :key="item.id">
                          <Card style="margin-top: 1vh;">
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

        }
    },
    computed: {
        ...mapGetters({
            orderInfo: 'getOrderInfo',
            orderStatus: 'getOrderStatus'
        }),
    },
    methods: {

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
    vertical-align: center;
    margin: auto;
}
.container-fluid{
    width: 70vw;
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

