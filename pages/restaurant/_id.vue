<template>
   <div class="page">
      <div class="text-center">
         <img class="bg--image" :src="loadRest.banner_img_url"/>
      </div>
      <div class="resInfo">
          <Card  :bordered="false">
         <h2>{{loadRest.name}}</h2>
         <p>{{loadRest.description}}</p>

         <!--
            <Row class="row">
                <Tag >American</Tag>
                <Tag >Fast food</Tag>
                <Tag >Pizza</Tag>
                <Tag >Burger</Tag>
            </Row>
            -->
            <Row class="row">
            <Col>
                <Icon type="md-time" size="24"/>
                <Badge :text="'15-25 min'"  type="success"></Badge>
            </Col>
            <!--
            <Col style="margin-left: 2px;">
                <Icon type="ios-star" size="24" color="#FFD300"/>
                <span>4.6 (200)</span>
            </Col>
            -->
            </Row>

      </Card>
      </div>
      <div class="container">
          <div class="container-select"  v-for="(menu , index) in loadRest.menus" :key="index">
      <Select v-model="menuGroup" size="large" style="width:100px; border: none">
        <Option v-for="group in menu.groups" :key="group.id" :value="group.name" >{{ group.name }}</Option>
    </Select>
     
    </div>
      </div>
     <div class="container"  >
         <div v-for="menu in menus" :key="menu.id">
        <div v-if="menu.name == menuGroup">
            <div v-if="menu.items.length">
                <div v-for="item in menu.items" :key="item.id">
                <nuxt-link :to="`../item/${item.id}?restaurant=${loadRest.name}&menu=${menu.id}`" class="itemtab">
                        <Card dis-hover :bordered="false" width="100%">
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
            </div>
            <div v-else>
                <Card dis-hover :bordered="false">
                    <h4>no item in {{menu.name}} menu</h4>
                </Card>
            </div>
        </div>
        </div>
      <cart />
   </div>
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
            menuGroup: '',
            menus: [],
            selectedMenu: {}
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
    watch: {
        loadRest(newVal , oldVal) {
            let that = this
            if(newVal){
               if(newVal.menus.length){
                    newVal.menus.forEach(group => {
                    group.groups.forEach(menu => {
                        that.menus.push(menu)
                    })
                });
                that.menuGroup = that.menus[0].name
                
               }
            }
        },
        menuGroup: (newVal , oldVal) =>{
            let that = this
            if(newVal){
                
            }
        }

    },
    mounted() {
        let that = this
        let id = this.$route.params.id
        let data = {
            that,
            id
        }
       this.$Spin.show();
        that.getSpecificRest(data)
        this.getCartFromLS()
    },
    destroyed() {
        this.clearSpecificRest()
    }
}
</script>
<style scoped>
.page{
    max-width: 100vw;
    background: linear-gradient(#eee, white);
    min-height: 100vh;
}
.resInfo{
    width: 86%;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: -8vh;
    box-shadow: 1px 1px 1px 1px #d3d3d3;
}
ivu-select-selection {
    border: 3px solid red;;
}
.ivu-card{
    width: 100%;
    margin: auto;
}
.text-center {
    text-align: center;
    background-color: white;
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
    width: 86%;
    display: flex;
    padding-top: 1vh;
    justify-content: center;
    margin: auto;
}
.container-select{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: white;
    margin: auto;
}
.item--img{
    width: 100px;
}
.itemtab{
    color: #515a6e;
    margin-top: 2vh;
}
</style>

