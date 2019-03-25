<template>
  <section class="page">
    <Menu mode="horizontal" :theme="'light'" active-name="1">
      <span class="container--row">
        <h4>Deats</h4>
        <h4>
          <Icon size="24" @click="drawer = true" type="ios-menu"/>
        </h4>
      </span>
    </Menu>
    <div class="content">
      <Form label-position="top">
        <FormItem label="Restaurant Name">
          <Input v-model="rest.name"/>
        </FormItem>
        <FormItem label="Description">
          <Input
            v-model="rest.descp"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter Restaurant description"
          />
        </FormItem>
        <FormItem label="Stripe Code">
          <Input v-model="rest.stripe_code"/>
        </FormItem>
        <FormItem label="Banner Image">
          <input class="ivu-upload-drag" type="file" @change="fileUpload">
          <h4 style="color: red">No .png file supported</h4>
        </FormItem>
        <img class="bg--image" :src="rest.banner_img_url">
        <Button
          type="success"
          @click="addRestaurant()"
          long
          style="margin-top: 5vh;"
        >Create Restaurant</Button>
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
        <Avatar icon="ios-person" size="large"/>
        <h3 class="name">
          <b>user name</b>
        </h3>
        <h4>user email</h4>
        <Divider/>
        <Menu active-name="4" class="menu-side" :open-names="['1']">
          <MenuItem name="0" to="/">
            <Icon type="ios-home"/>Home
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-filing"/>Order List
            </template>
            <MenuItem name="1-1" to="../order/list">
              <Icon type="md-arrow-down"/>In Coming
            </MenuItem>
            <MenuItem name="1-2" to="../order/list">
              <Icon type="ios-clock-outline"/>In Progress
            </MenuItem>
            <MenuItem name="1-3" to="../order/list">
              <Icon type="ios-checkmark-circle-outline"/>Done
            </MenuItem>
          </Submenu>
          <MenuItem name="4">
            <Icon type="md-add"/>Create restaurant
          </MenuItem>
        </Menu>
      </div>
    </Drawer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      selectedImg: null,
      rest: {
        name: "",
        descp: "",
        stripe_code: "",
        banner_img_url: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      bannerUrl: "getBannerUrl"
    })
  },
  methods: {
    ...mapActions({
      addNewRestaurant: "addNewRestaurant",
      saveRestImage: "saveRestImage"
    }),
    addRestaurant() {
      let that = this;
      if (that.rest.name == "") {
        this.$Message.warning(`Name Required`);
      } else if (that.rest.descp == "") {
        this.$Message.warning(`Description Required`);
      } else if (that.rest.stripe_code == "") {
        this.$Message.warning(`Stripe Code required Required`);
      } else if (that.rest.banner_img_url == "") {
        this.$Message.warning(`Banner image Required`);
      } else {
        that.$Spin.show();
        let data = {
          //owner: 6,
          name: that.rest.name,
          description: that.rest.descp,
          stripe_code: that.rest.stripe_code,
          banner_img_url: that.rest.banner_img_url,
          that: that
        };
        that.addNewRestaurant(data);
      }
    },
    fileUpload(event) {
      let that = this;
      that.selectedImg = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      let that = this;
      const file = new FormData();
      file.append("image", that.selectedImg, that.selectedImg.name);
      that.saveRestImage(file);
    }
  },
  watch: {
    bannerUrl(newVal) {
      let that = this;
      that.rest.banner_img_url = newVal;
    }
  }
};
</script>
<style scoped>
.page {
  font-family: "Product Sans";
  background: linear-gradient(
    #f5f5f5,
    #f6f6f6,
    #f7f7f7,
    #f8f8f8,
    #f9f9f9,
    #fafafa,
    #fbfbfb,
    #fcfcfc,
    #fdfdfd,
    #fefefe,
    #ffffff
  );
}
.ivu-menu {
  background-color: #f8f9fa;
}
.container--row {
  padding: 0vh 5vw 0vh 5vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.content {
  min-height: 85vh;
  width: 100%;
  padding: 2vh 20px 10px 20px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.bg--image {
  max-height: 40vh;
  max-width: 90vw;
}
.footer {
  bottom: 0;
  padding: 12px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
