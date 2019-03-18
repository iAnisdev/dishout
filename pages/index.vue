<template>
   <section class="">
      <Menu mode="horizontal" :theme="'light'" active-name="1">
         <span class="container--row">
            <h4>Deats</h4>
            <h4>
               <Icon size="24"  @click="drawer = true" type="ios-menu" />
            </h4>
         </span>
      </Menu>
      <div class="content">
         <div  v-for="(rest , index) in restList" :key='index'>
            <nuxt-link :to="`../restaurant/${rest.id}`" class="itemtab">
               <div class="rest">
                  <div class="text-center">
                     <img class="bg--image" :src="rest.banner_img_url"/>
                  </div>
                  <Card :bordered="false">
                     <h3>{{rest.name}}</h3>
                     <p class="text-justify">{{rest.description}}</p>
                  </Card>
               </div>
            </nuxt-link>
         </div>
      </div>
      <footer class="footer">
         <h4>
            © 2019. All Rights Reserved.
            <a href="mailto:mgild@deats.com">Contact Us</a>
         </h4>
      </footer>
      <Drawer title="Profile Info" placement="left" :closable="false" v-model="drawer">
         <div class="profile">
            <Avatar icon="ios-person" size="large" />
            <h3 class="name"><b>user name</b></h3>
            <h4>user email</h4>
            <Divider />
            <Menu active-name="1-1" class="menu-side" :open-names="['1']">
                <MenuItem name="0" >
                <Icon type="ios-home" />
                Home
            </MenuItem>
               <Submenu name="1">
                  <template slot="title">
                     <Icon type="ios-filing" />
                     Order List
                  </template>
                  <MenuItem name="1-1" to="./order/list">
                     <Icon type="md-arrow-down" />
                     In Coming
                  </MenuItem>
                  <MenuItem name="1-2" to="./order/list">
                     <Icon type="ios-clock-outline" />
                     In Progress
                  </MenuItem>
                  <MenuItem name="1-3" to="./order/list">
                     <Icon type="ios-checkmark-circle-outline" />
                     Done
                  </MenuItem>
               </Submenu>
            </Menu>
         </div>
      </Drawer>
   </section>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {
            drawer: false
        }
    },
    computed: {
        ...mapGetters({
            restList: 'restList'
        })
    },
    methods: {
        ...mapActions({
            getAllRest: 'getAllRest',
            getCartFromLS: 'getCartFromLS'
        }),
    },
    mounted() {
       let that = this
        this.getAllRest(that)
        this.getCartFromLS()
    }
}
</script>

<style scoped>
.ivu-menu{
  background-color: #f8f9fa;
}
.container--row{
  padding: 0vh 5vw  0vh 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.content{
  min-height: 90vh;
  width: 100%;
  padding: 0px 20px 10px 20px;
  background-color: #eee;;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.rest{
  margin-top: 10px;
  border-radius: 10px;
}
.ivu-card{
    top: -1vh;
    border-radius: 0px 0px 5px 5px;
}
.text-center{
  text-align: center;
  background-color: #fff;
  border-radius: 5px 5px 0px 0px ;
}
.bg--image{
    max-width: 100%;
    max-height: 30vh;
    border-radius: 5px 5px 0px 0px ;
}
.itemtab{
    color: #515a6e;
}
.name{
    margin-top: 1vh;
}
.menu-side{
    background-color: white;
    left: 0;
}
.footer{
   bottom:0;
   padding: 5px;
   background-color: #fff;
   width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>