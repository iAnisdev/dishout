<template>
   <section class="">
      <Menu mode="horizontal" :theme="'light'" active-name="1">
         <span class="container--row">
            <h4>Deats</h4>
            <a href="" >Login with Facebook</a>
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
   </section>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    data() {
        return {}
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
        this.getAllRest()
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