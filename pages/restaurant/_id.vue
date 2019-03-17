<template>
   <div class="page">
      <div class="text-center">
         <img class="bg--image" :src="loadRest.banner_img_url"/>
      </div>
      <Card>
         <h3>{{loadRest.name}}</h3>
         <p>{{loadRest.description}}</p>
         <!--
            <Row class="row">
                <Tag >American</Tag>
                <Tag >Fast food</Tag>
                <Tag >Pizza</Tag>
                <Tag >Burger</Tag>
            </Row>
            <Row class="row">
            <Col>
                <Icon type="md-time" size="24"/>
                <Badge :text="'15-25 min'"  type="success"></Badge>
            </Col>
            <Col style="margin-left: 2px;">
                <Icon type="ios-star" size="24" color="#FFD300"/>
                <span>4.6 (200)</span>
            </Col>
            </Row>
            -->
      </Card>
      <div class="container" v-for="menu in loadRest.menus" :key="menu.owner">
         <Tabs >
            <TabPane v-for="group in menu.groups" :key="group.id" :label="group.name">
               <div v-for="item in group.items" :key="item.id">
                  <nuxt-link :to="`../item/${item.id}?restaurant=${loadRest.name}&menu=${menu.id}`" class="itemtab">
                     <Card dis-hover :bordered="false">
                        <Row class="row--justify">
                           <Col span="12">
                           <h4>{{item.name}}</h4>
                           <p style="margin-top: 1px; textalign: justify">{{item.description}}</p>
                           </Col>
                           <Col span="4">
                           </Col>
                           <Col span="8">
                           <img :src="item.img_url" :alt="item.name" class="item--img">
                           </Col>
                        </Row>
                     </Card>
                     <Divider />
                  </nuxt-link>
               </div>
            </TabPane>
         </Tabs>
      </div>
      <cart />
   </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import cart from '@/components/cart.vue'

export default {
    components: {
        cart,
    },
    data() {
        return {
            menuTiming: '',
            group: 'breakfast',
        }
    },
    computed: {
        ...mapGetters({
            loadRest: 'loadRest',
            cart: 'getCart'
        })
    },
    methods: {
        ...mapActions({
            getSpecificRest: 'getSpecificRest',
            clearSpecificRest: 'clearSpecificRest',
            getCartFromLS: 'getCartFromLS'
        }),
    },
    mounted() {
        let params = this.$route.params
        this.getCartFromLS()
        this.getSpecificRest(params.id)
    },
    destroyed() {
        this.clearSpecificRest()
    }
}
</script>
<style scoped>
.page{
    max-width: 100vw;
}
.ivu-card{
    width: 90vw;
    margin: auto;
}
.text-center {
    text-align: center
}
.bg--image{
    max-height: 45vh;
    max-width: 100vw;
}
.cuisine--list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.row{
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.row--justify{
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.container{
    width: 90vw;
    display: flex;
    justify-content: center;
    margin: auto;
}
.item--img{
    width: 100px;
}
.itemtab{
    color: #515a6e;
}
</style>

