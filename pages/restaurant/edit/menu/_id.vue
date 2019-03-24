<template>
  <section class="page">
      <Menu mode="horizontal" :theme="'light'" active-name="1">
         <span class="container--row">
            <Icon type="md-arrow-round-back" size="24" class="icon--back" @click="goBack()"/> 
            <h4>Edit {{rest.name}} Menu</h4>
            <h4>
               <Icon size="24"  @click="drawer = true" type="ios-menu" />
            </h4>
         </span>
      </Menu>
      <div class="content">
         <div class="menu menu_a" v-if="!rest.showMenu">
               <h2>No Menu Yet</h2>
         </div>
         <div class="menu menu_a" v-for="menu in rest.menus" :key="menu.id">
            <div class="row">
               <h2>{{menu.name}}</h2>
            <div>
                <Icon type="md-create" size="24"  color="#2d8cf0"  @click="editGroupModal(menu)"/>
                <Icon type="md-trash" size="24" color="#ff0000" @click="deleteGroupModal(menu)"/>
            </div> 
            </div>
            <div v-for="group in menu.groups" :key="group.id">
              <nuxt-link :to="`../group/${group.id}`">
                  <div class="menu">
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
              </nuxt-link>
               <Divider />
            </div>
            <div class="mt-4">
               <Button type="default" long @click="addMenuModal(menu)">Add Group</Button>
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
            </Menu>
         </div>
      </Drawer>
      <!-- Menu -->
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
        v-model="editGroup"
        title="Update Menu Group"
        ok-text="update"
        @on-ok="updateMenuGroup()"
        @on-cancel="cancel()">
        <Form label-position="top">
        <FormItem label="Menu Name">
            <Input v-model="targetGroup.name"></Input>
        </FormItem>
    </Form>
    </Modal>
    <!--Menu Group -->
    <Modal
        v-model="addMenugrp"
        title="Add New Menu"
        @on-ok="addMenuGroup()"
        @on-cancel="cancel()">
         <Form label-position="top">
        <FormItem label="Menu Name">
            <Input v-model="newMenuGroup"></Input>
        </FormItem>
        <FormItem label="Menu Status">
              <Checkbox v-model="isActive" size="large">Active</Checkbox>
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
            targetMenuGroup: {},
            targetGroup: {},
            editGroup: false,
            newMenuGroup: '',
            addMenugrp: false,
            isActive: true
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
            addNewMenu: 'addNewMenu',
            updateSpecificMenu: 'updateSpecificMenu',
            deleteSpecificMenu: 'deleteSpecificMenu',
            addNewMenuGroup: 'addNewMenuGroup'
        }),
        addmenuPopup(){
           this.drawer = false
           this.addMenu = true
        },
        newMenu(){
            let that = this
            if(that.newMenuName == ''){
               that.$Message.warning(`Menu Name Required`);
            }else{
            let data = {
                name: that.newMenuName,
                restaurant: that.rest.id,
                that: that
            }
            that.addNewMenu(data)
            that.newMenuName = ''
            }
        },
        addMenuModal(menu){
           let that = this 
           that.targetMenuGroup = menu
           that.addMenugrp = true
        },
        addMenuGroup(){
           let that = this
           if(that.newMenuGroup == ''){
               that.$Message.warning(`Menu Group Name Required`);
           }else{
           let data = {
              name: that.newMenuGroup,
              menu: that.targetMenuGroup.id,
              active: that.isActive,
              that: that,
              restId: this.$route.params.id
           }
           that.addNewMenuGroup(data)
           that.newMenuGroup = ''
           }
        },
        cancel(){

        },
        editGroupModal(menu){
           this.targetGroup = menu
           this.editGroup = true
        },
        deleteGroupModal(menu){
           let that = this
           this.$Modal.error({
            title: 'Delete Menu',
            content: `Are you sure to delete <b>${menu.name}</b> menu group?`,
            okText: 'Delete',
            closable: true,
            onOk: () => {
               that.deleteSpecificMenu({id : menu.id})
            },
         });
        },
        updateMenuGroup() {
           let that = this 
           let data = {
              id: that.targetGroup.id,
              name: that.targetGroup.name,
              restaurant: that.targetGroup.restaurant,
           }
           that.updateSpecificMenu(data)
           that.targetGroup = {}
        },
      goBack(){
         this.$router.back()
      }
    },
    watch: {
       loadRest ( newVal , oldVal) {
          let that = this
          if(newVal){
             if(newVal.menus.length){
                newVal.showMenu = true
             }else{
                newVal.showMenu = false
             }
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
    justify-content: space-between
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
.mt-4{
   margin-top: 2vh;
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
