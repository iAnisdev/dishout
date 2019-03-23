<template>
  <section class="page">
      <Menu mode="horizontal" :theme="'light'" active-name="1">
         <span class="container--row">
            <h4>Edit {{rest.name}}</h4>
            <h4>
               <Icon size="24"  @click="drawer = true" type="ios-menu" />
            </h4>
         </span>
      </Menu>
      <div class="content">
         <div v-for="menu in rest.menus" :key="menu.id">
            <h3><u>{{menu.name}}</u></h3>
            <div v-for="group in menu.groups" :key="group.id">
               <div class="menu">
                  <div class="row-end">
                     <Icon type="md-trash" size="20" color="#ff0000" @click="deleteModal(group)"/>
                     <Icon type="md-create" size="20" @click="editModal(group)"/>
                  </div>
                  <ul class="order">
                     <li class="row">
                        Menu Name:
                        <span>
                        <b>{{group.name}}</b>
                        </span>
                     </li>
                     <li class="row">
                        Status:
                        <span>
                        <b>{{group.active | status}}</b>
                        </span>
                     </li>
                     <li class="row">
                        Items:
                        <span>
                        <b>{{group.items.length}}</b>
                        </span>
                     </li>
                  </ul>
               </div>
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
                     Menu list
                  </template>
                  <MenuItem name="1-1"   @click.native="addmenuPopup()">
                  <Icon type="md-add" />
                     Add New menu
                  </MenuItem>
                  <MenuItem name="1-2">
                <Icon type="md-create" />
                     Update Menu
                  </MenuItem>
               </Submenu>
                <Submenu name="2">
                  <template slot="title">
                     <Icon type="ios-filing" />
                     Item List
                  </template>
                  <MenuItem name="2-1" to="./order/list">
                  <Icon type="md-add" />
                     Add New Item
                  </MenuItem>
                  <MenuItem name="2-2" to="./order/list">
                <Icon type="md-create"/>
                     Update Item
                  </MenuItem>
               </Submenu>
            </Menu>
         </div>
      </Drawer>
      <Modal
        v-model="addMenu"
        title="Add New Menu"
        @on-ok="newMenu()"
        @on-cancel="cancel()">
         <Form label-position="top">
        <FormItem label="Menu Name">
            <Input v-model="newMenuName"></Input>
        </FormItem>
        
    </Form>
    </Modal>
      <Modal
        v-model="editMenu"
        title="Update Menu"
        ok-text="update"
        @on-ok="updateMenu()"
        @on-cancel="cancel()">
        <Form label-position="top">
        <FormItem label="Menu Name">
            <Input v-model="targetMenu.name"></Input>
        </FormItem>
        <FormItem label="Menu Status">
             <Select v-model="targetMenu.active">
               <Option value="true">Active</Option>
               <Option value="false">Inactive</Option>
            </Select>
        </FormItem>
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
            rest: {},
            addMenu: false,
            newMenuName: '',
            editMenu: false,
            targetMenu: {},
            status: '',
        }
    },
    computed: {
        ...mapGetters({
            loadRest: 'loadRest',
        })
    },
    methods: {
        ...mapActions({
            getSpecificRest: 'getSpecificRest',
            clearSpecificRest: 'clearSpecificRest',
            addNewMenu: 'addNewMenu'
        }),
        addmenuPopup(){
           this.drawer = false
           this.addMenu = true
        },
        newMenu(){
            let that = this
            let data = {
                name: that.newMenuName,
                restaurant: that.rest.name
            }
            that.addNewMenu(data)
            that.newMenuName = ''
        },
        cancel(){

        },
        editModal(group){
           this.targetMenu = group
           this.editMenu = true,
           this.status = this.targetMenu.active
        },
        updateMenu(){
        },
         deleteModal(menu){
           this.$Modal.error({
            title: 'Delete Menu',
            content: `Are you sure to delete ${menu.name} menu?`,
            okText: 'Delete Menu',
            closable: true,
            onOk: () => {
               this.$Message.info('Clicked ok');
            },
         });
        }
    },
    watch: {
       loadRest ( newVal , oldVal) {
          let that = this
          if(newVal){
             that.rest = that.loadRest
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
    },
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
  box-shadow: 1px 1px 1px 1px #d3d3d3;
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
.container--row{
  padding: 0vh 5vw  0vh 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
