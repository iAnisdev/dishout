<template>
   <div class="page">
    <Icon type="md-arrow-round-back" size="36" class="icon--back" color="#ffffff" @click="goBack()"/> 
      <div class="text-center">
         <img class="bg--image" :src="loadRest.banner_img_url"/>
      </div>
      <div class="bg-gradient">
          <div class="resInfo">
          <Card  :bordered="false">
            <div class="row--space">
                <div>
                <h2>{{loadRest.name}}</h2>
                <p>{{loadRest.description}}</p>
                </div>
                <nuxt-link :to="`./edit/${loadRest.id}`">
                <Icon type="md-create" size="24" />
                </nuxt-link>
            </div>
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
      <Divider />
      <div class="container" v-if="menus.length">
        <div class="container-select"  v-for="(menus , index) in loadRest.menus" :key="index">
            <Select v-model="menuGroup" size="large" style="width:100px;" >
                <Option v-for="group in menus.groups" :key="group.id" :value="group.name" >{{ group.name }}</Option>
            </Select>
        </div>
      </div>
      <Divider  v-if="menus.length"/>
     <div class="container" v-if="menus">
         <div v-for="menu in menus" :key="menu.id">
        <div v-if="menu.name == menuGroup">
            <div v-if="menu.items.length">
                <div v-for="item in menu.items" :key="item.id">
                <nuxt-link :to="`../item/${item.id}?restaurant=${loadRest.name}&menu=${menuId}`" class="itemtab">
                        <Card dis-hover :bordered="false" width="100%">
                            <Row class="row--justify">
                            <Col span="12">
                            <h2>{{item.name}}</h2>
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
            selectedMenu: {},
            menuId: null
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
        goBack(){
            this.$router.back()
        }
    },
    watch: {
        loadRest(newVal , oldVal) {
            console.log(newVal , oldVal)
            let that = this
            if(newVal){
               if(newVal.menus.length){
                    newVal.menus.forEach(group => {
                    group.groups.forEach(menu => {
                        that.menus.push(menu)
                        that.menuGroup = that.menus[0].name
                        that.menuId = that.menus[0].id
                    })
                });
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
    min-height: 100vh;
   font-family: 'Product Sans';
    background: linear-gradient(#f5f5f5 , #f6f6f6 , #f7f7f7 , #f8f8f8 , #f9f9f9 , #fafafa , #fbfbfb , #fcfcfc , #fdfdfd ,#fefefe , #ffffff);
}
.resInfo{
    width: 86%;
    display: flex;
    justify-content: center;
    margin: auto;
    margin-top: -10vh;
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
}
.row--space{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
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
    margin: auto;
}
.item--img{
    width: 100px;
}
.icon--back{
    position: absolute;
    left: 0;
    padding: 10px;
}
.ivu-divider-horizontal{
    margin: 12px 0;
}
.itemtab{
    color: #515a6e;
    margin-top: 2vh;
}
</style>

