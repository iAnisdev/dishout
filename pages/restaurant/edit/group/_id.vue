<template>
  <section class="page">
      <Menu mode="horizontal" :theme="'light'" active-name="1">
         <span class="container--row">
            <Icon type="md-arrow-round-back" size="24" class="icon--back" @click="goBack()"/> 
            <h4>Edit {{group.name}} Menu</h4>
            <h4>
               <Icon size="24"  @click="drawer = true" type="ios-menu" />
            </h4>
         </span>
      </Menu>
      <div class="content">
       <div class="menu menu_a">
            <div class="row">
                <div>
                <h1>{{group.name}}</h1>
                <h2>Status: 
                <Tag color="success" type="border" v-if="group.active">{{group.active | status}}</Tag>
                <Tag color="error" type="border" v-if="!group.active">{{group.active | status}}</Tag></h2>
                </div>
               <div>
                <Icon type="md-create" size="24"  color="#2d8cf0" @click="editModal = true"/>
                <Icon type="md-trash" size="24" color="#ff0000" @click="deleteMenuGroup(group)"/>
               </div>
            </div>
            <Divider />
                <div class="row">
                <h2><b>Items: </b></h2>
                <Button  @click.native="addItemModel = true">New Item</Button>
                </div>
                        <Card dis-hover :bordered="false" width="100%" v-if="!showItems">
                        <Row class="row--justify">
                            No items Yet
                        </Col>
                        </Row>
                </Card>
             <div v-for="item in group.items" :key="item.id">
               <nuxt-link :to="`../item/${item.id}`" class="itemtab">
                    <Card dis-hover :bordered="false" width="100%">
                    <Row class="row--justify">
                    <Col span="12">
                    <h2>{{item.name}}</h2>
                    <h3>${{item.price}}</h3>
                    <p style="margin-top: 1px; textalign: justify">{{item.description}}</p>
                    </Col>
                    <Col span="12">
                    <img :src="item.img_url" :alt="item.name" class="item--img">
                    </Col>
                    </Row>
                </Card>
                <Divider />
               </nuxt-link>
            </div>
         </div>
      </div>
      <footer class="footer">
         <h3>
            © 2019. All Rights Reserved.
            <a href="mailto:mgild@deats.com">Contact Us</a>
         </h3>
      </footer>
      <Drawer title="Profile Info" placement="left" :closable="false" v-model="drawer">
         <div class="profile">
            <Avatar icon="ios-person" size="large" />
            <h3 class="name"><b>user name</b></h3>
            <h4>user email</h4>
            <Divider />
            <Menu active-name="1-2" class="menu-side" :open-names="['1']">
                <MenuItem name="0" to="/">
                <Icon type="ios-home" />
                Home
            </MenuItem>
               <Submenu name="1">
                  <template slot="title">
                     <Icon type="ios-filing" />
                     Menu 
                  </template>
                  <MenuItem name="1-1" @click.native="editModal = true , drawer = false">
                  <Icon type="md-create" />
                     Edit Menu
                  </MenuItem>
               </Submenu>
                <Submenu name="2">
                  <template slot="title">
                     <Icon type="ios-filing" />
                     Item 
                  </template>
                  <MenuItem name="2-1" @click.native="addItemModel = true , drawer = false">
                  <Icon type="md-add" />
                     Add New Item
                  </MenuItem>
               </Submenu>
            </Menu>
         </div>
      </Drawer>
       <Modal
        v-model="editModal"
        title="Edit Menu"
        @on-ok="updateMenuGroup()"
        @on-cancel="cancel()">
         <Form label-position="top">
        <FormItem label="Menu Name">
            <Input v-model="group.name"></Input>
        </FormItem>
        <FormItem label="Menu Status">
              <Checkbox v-model="group.active" size="large">Active</Checkbox>
        </FormItem>
    </Form>
    </Modal>

       <Modal
       style="top: 20px"
        v-model="addItemModel"
        title="Add New Item"
        ok-text="Add Item"
        @on-ok="addNewItem()"
        @on-cancel="cancel()">
         <Form label-position="top">
        <FormItem label="Item Name">
            <Input v-model="item.name"></Input>
        </FormItem>
        <FormItem label="Item Description">
            <Input v-model="item.description"></Input>
        </FormItem>
        <FormItem label="Item Price">
            <Input  v-model="item.price"></Input>
        </FormItem>
        <FormItem label="Menu Status">
              <Checkbox v-model="item.active" size="large">Active</Checkbox>
        </FormItem>
          <Upload
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
        </div>
    </Upload>
    </Form>
    </Modal>
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
            drawer: false,
           editModal: false,
           addItemModel: false,
           showItems: false,
           item: {
                name: '',
                description: '',
                price: '',
                img_url: 'https://www.kfc.com.au/sites/default/files/aloha/zinger_box.jpg',
                active: false,
           }
        }
    },
    computed: {
        ...mapGetters({
            group: 'getGroup'
        })
    },
    methods: {
        ...mapActions({
            getSpecificMenuGroup: 'getSpecificMenuGroup',
            updateSpecificMenuGroup: 'updateSpecificMenuGroup',
            addSpecificItem: 'addSpecificItem',
            deleteSpecificMenuGroup: 'deleteSpecificMenuGroup'
        }),
         goBack(){
            this.$router.back()
         },
        cancel(){
        },
        updateMenuGroup(){
           let that = this 
           let data = {
              name: that.group.name,
              menu: that.group.menu,
              active: that.group.active,
              that: that,
              id: that.group.id
           }
           that.updateSpecificMenuGroup(data)
        },
        addNewItem(){
            let that = this
            if(that.item.name == ''){
               that.$Message.warning(`Item Name Required`);
            }else  if(that.item.description == ''){
               that.$Message.warning(`Item description Required`);
            }else  if(that.item.price == ''){
               that.$Message.warning(`Item price Required`);
            }else {
            let data = {
                name: that.item.name,
                description: that.item.description,
                price: that.item.price,
                img_url: that.item.img_url,
                active: that.item.active,
                menu_group: that.group.id,
                that: that
            }
            that.addSpecificItem(data)
            that.item = {
                name: '',
                description: '',
                price: '',
                img_url: 'https://www.kfc.com.au/sites/default/files/aloha/zinger_box.jpg',
                active: false,
            }
            }
        },
        deleteMenuGroup(group){
            let that = this 
            this.$Modal.error({
               title: 'Delete option',
               content: `Are you sure to delete ${group.name}`,
               okText: 'Delete',
               onOk: () => {
                  let data = {
                     that: that,
                     id: group.id
                  }
                  that.deleteSpecificMenuGroup(data)
               }
            });
        },
        refresh(){
        let that = this
        let id = this.$route.params.id
        let data = {
            that,
            id
        }
       this.$Spin.show();
       that.getSpecificMenuGroup(data)
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
       that.getSpecificMenuGroup(data)
    },
    watch: {
        group(newVal , oldVal) {
            let that = this
            if(newVal.items.length){
                that.showItems = true
            }else{
                that.showItems = false
            }
        }
    }
}
</script>
<style scoped>
.page{
    max-width: 100vw;
    background: linear-gradient(#f5f5f5 , #f6f6f6 , #f7f7f7 , #f8f8f8 , #f9f9f9 , #fafafa , #fbfbfb , #fcfcfc , #fdfdfd ,#fefefe , #ffffff);
   font-family: 'Product Sans';
    min-height: 100vh;
}
.ivu-menu{
  background-color: #f8f9fa;
}
.menu{
  margin-top: 12px;
  background-color: white;
  border-radius: 5px;
  padding: 1vh 5vw  1vh 5vw;
}
.menu_a{
  box-shadow: 1px 1px 1px 1px #d3d3d3;
}
ul , ol {
    list-style-type: none;
}
.row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-self: center;
    align-items: center;
}
.order{
    color: #515a6e;
    margin-top: 1vh;
}
.container--row{
  padding: 0vh 2vw  0vh 2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.row--justify{
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.item--img{
    width: 120px;
    align-self: center;
    border-radius: 4px;
    }
.icon--back{
    left: 0;
    align-self: center;
}
.input{
   margin-top: 2vh;
}
.row-end{
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
}
.content{
  min-height: 84vh;
  width: 100%;
  padding: 2vh 20px 10px 20px;
  background-color: #eee;;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.ivu-modal{
    top: 20px;
}
.itemtab{
    color: #515a6e;
}
.footer{
   bottom:0;
   padding: 12px;
   background-color: #fff;
   width:100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
