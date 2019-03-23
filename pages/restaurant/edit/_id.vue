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
         <Form :model="rest" label-position="top">
            <FormItem label="Restaurant Name">
               <Input v-model="rest.name" placeholder="Restaurant name" />
            </FormItem>
            <FormItem label="Description" class="input" >
          <Input v-model="rest.description" type="textarea" :rows="4" placeholder="Restaurant description" />
            </FormItem>
            <FormItem label="Stripe Code" class="input" >
         <Input v-model="rest.stripe_code"  placeholder="Stripe code" />
            </FormItem>
            <FormItem>
                <div class="demo-upload-list">
                  <img :src="rest.banner_img_url">
                  <div class="demo-upload-list-cover">
                     <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                     <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                  </div>
                </div>
                 <Upload
                  ref="upload"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block;width:120px;">
                  <div style="width: 120px;height:120px;line-height: 120px;">
                        <Icon type="ios-camera" size="40"></Icon>
                     </div>
                     </Upload>
            </FormItem>
            <Button type="success" long>Update Restaurant</Button>
         </Form>
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
            <Menu active-name="1-1" class="menu-side" :open-names="['1']">
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
                  <MenuItem name="1-2" :to="`./menu/${rest.id}`">
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
            newMenuName: ''
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
        handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
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
.container--row{
  padding: 0vh 5vw  0vh 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input{
   margin-top: 2vh;
}
.content{
  min-height: 84vh;
  width: 100%;
  padding: 2vh 20px 10px 20px;
  background-color: #eee;;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
} .demo-upload-list{
        display: inline-block;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
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
