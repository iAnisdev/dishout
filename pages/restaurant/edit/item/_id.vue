<template>
  <section class="page">
    <Menu mode="horizontal" :theme="'light'" active-name="1">
      <span class="container--row">
        <Icon type="md-arrow-round-back" size="24" class="icon--back" @click="goBack()"/>
        <h4>Edit {{rest.name}}</h4>
        <h4>
          <Icon size="24" @click="drawer = true" type="ios-menu"/>
        </h4>
      </span>
    </Menu>
    <div class="content">
      <div>
        <Card :bordered="false">
          <div class="row">
            <div>
              <h1>{{item.name}}</h1>
              <h3>${{item.price}}</h3>
              <p class="text-justify">{{item.description}}</p>
            </div>
            <div class="row">
              <Icon type="md-create" size="24" color="#2d8cf0" @click="updateModal = true"/>
              <Icon type="md-trash" size="24" color="#ff0000" @click="deleteItem(item)"/>
            </div>
          </div>
        </Card>
        <div v-for="group in item.radio_option_groups" :key="group.id">
          <Card style="margin-top: 2vh" :bordered="false">
            <p slot="title">{{group.description}}</p>
            <p slot="extra">
              <Icon
                type="md-create"
                size="24"
                color="#2d8cf0"
                @click="editRadioGroupModal =  true , targetRadioGroup = group"
              />
              <Icon type="md-trash" size="24" color="#ff0000" @click="deleteGroup(group)"/>
              <Button type="info" @click="modifierItemModal = true , radio_group = group">Add Option</Button>
            </p>
            <div v-for="option in group.options" :key="option.id">
              <div class="row">
                <h4 class="option">{{option.name}}</h4>
                <div>
                  <Icon
                    type="md-create"
                    size="24"
                    color="#2d8cf0"
                    @click="editRadioModal =  true , targetRadioItem = option"
                  />
                  <Icon type="md-trash" size="24" color="#ff0000" @click="deleteRadio(option)"/>
                </div>
              </div>
              <Divider/>
            </div>
          </Card>
        </div>
        <Card style="margin-top: 2vh" :bordered="false">
          <p slot="title">condiments</p>
          <p slot="extra">
            <Button type="info" @click="optionItemModal = true">Add Option</Button>
          </p>
          <div v-for="option in item.options" :key="option.id">
            <div class="row">
              <h4 class="option">{{option.name}} - ${{option.price}}</h4>
              <div>
                <Icon
                  type="md-create"
                  size="24"
                  color="#2d8cf0"
                  @click="editOptionModal =  true , targetOption = option"
                />
                <Icon type="md-trash" size="24" color="#ff0000" @click="deleteOption(option)"/>
              </div>
            </div>
            <Divider/>
          </div>
        </Card>
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
        <Avatar icon="ios-person" size="large"/>
        <h3 class="name">
          <b>user name</b>
        </h3>
        <h4>user email</h4>
        <Divider/>
        <Menu active-name="1" class="menu-side" :open-names="['1' , '2']">
          <MenuItem name="0" to="/">
            <Icon type="ios-home"/>Home
          </MenuItem>
          <MenuItem name="0" @click.native="updateModal = true , drawer = false">
            <Icon type="md-create"/>Update Item
          </MenuItem>
          <Submenu name="1" v-if="!isGroup">
            <template slot="title">
              <Icon type="ios-filing"/>Modifiers
            </template>
            <MenuItem name="1-1" @click.native="modifierGroupModal = true , drawer = false">
              <Icon type="md-create"/>Add Modifier Group
            </MenuItem>
          </Submenu>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-filing"/>Condiments
            </template>
            <MenuItem name="2-1" :to="`./menu/${rest.id}`">
              <Icon type="md-create"/>Add New condiment
            </MenuItem>
          </Submenu>
        </Menu>
      </div>
    </Drawer>
    <!--Update item -->
    <Modal v-model="updateModal" title="Update Item" ok-text="Update " @on-cancel="cancel">
      <Form :model="rest" label-position="top">
        <FormItem label="Item Name">
          <Input v-model="item.name" placeholder="Item name"/>
        </FormItem>
        <FormItem label="Description" class="input">
          <Input
            v-model="item.description"
            type="textarea"
            :rows="4"
            placeholder="Item description"
          />
        </FormItem>
        <FormItem label="Item Price">
          <Input v-model="item.price" placeholder="Item Price"/>
        </FormItem>
        <FormItem>
          <div class="demo-upload-list">
            <img :src="item.img_url">
            <div class="demo-upload-list-cover"></div>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:60px;"
          >
            <div style="width: 60px;height:60px;line-height: 60px;">
              <Icon type="ios-camera" size="40"></Icon>
            </div>
          </Upload>
        </FormItem>
        <Checkbox v-model="item.active">Active</Checkbox>
      </Form>
    </Modal>
    <!--Add group -->
    <Modal
      title="Add Modifier Group"
      ok-text="Add Group"
      @on-ok="addGroup()"
      @on-cancel="cancel"
      v-model="modifierGroupModal"
    >
      <Form label-position="top">
        <FormItem label="Description" class="input">
          <Input v-model="modifierGroup.description" placeholder="Item description"/>
        </FormItem>
        <Row>
          <Col span="11">
            <FormItem label="Min selectable" class="input">
              <InputNumber
                :min="1"
                :step="1"
                v-model="modifierGroup.min_selectable"
                placeholder="Min selectable"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="2">
            <span style="color: #fff">-</span>
          </Col>
          <Col span="11">
            <FormItem label="Max selectable" class="input">
              <InputNumber
                :min="1"
                :step="1"
                v-model="modifierGroup.max_selectable"
                placeholder="Max selectable"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <!--Add group item -->
    <Modal
      title="Add Modifier Group"
      ok-text="Update Group"
      @on-ok="addRItem()"
      @on-cancel="cancel"
      v-model="modifierItemModal"
    >
      <Form label-position="top">
        <FormItem label="Name" class="input">
          <Input v-model="modifierItem.name" placeholder="Name"/>
        </FormItem>
        <FormItem label="Description" class="input">
          <Input v-model="modifierItem.description" placeholder="description"/>
        </FormItem>
        <FormItem label="Status" class="input" type="number">
          <Checkbox v-model="modifierItem.active">Active</Checkbox>
        </FormItem>
      </Form>
    </Modal>
    <!--Add Option item -->
    <Modal
      title="Add Modifier Group"
      @on-ok="addOption()"
      ok-text="Add Option"
      @on-cancel="cancel"
      v-model="optionItemModal"
    >
      <Form label-position="top">
        <FormItem label="Name" class="input">
          <Input v-model="option.name" placeholder="Name"/>
        </FormItem>
        <FormItem label="Description" class="input">
          <Input v-model="option.description" placeholder="description"/>
        </FormItem>
        <FormItem label="Price" class="input">
          <Input v-model="option.price" placeholder="Price"/>
        </FormItem>
        <FormItem label="Status" class="input" type="number">
          <Checkbox v-model="option.active">Active</Checkbox>
        </FormItem>
      </Form>
    </Modal>
    <!-- Edit Option Modals -->
    <Modal
      title="Update Option"
      ok-text="Update option"
      @on-ok="editOption()"
      @on-cancel="cancel"
      v-model="editOptionModal"
    >
      <Form label-position="top">
        <FormItem label="Name" class="input">
          <Input v-model="targetOption.name" placeholder="Name"/>
        </FormItem>
        <FormItem label="Description" class="input">
          <Input v-model="targetOption.description" placeholder="description"/>
        </FormItem>
        <FormItem label="Price" class="input">
          <Input v-model="targetOption.price" placeholder="Price"/>
        </FormItem>
        <FormItem label="Status" class="input" type="number">
          <Checkbox v-model="targetOption.active">Active</Checkbox>
        </FormItem>
      </Form>
    </Modal>

    <!--update Radio item -->
    <Modal
      title="update option"
      ok-text="Update option"
      @on-ok="addRItem()"
      @on-cancel="cancel"
      v-model="editRadioModal"
    >
      <Form label-position="top">
        <FormItem label="Name" class="input">
          <Input v-model="targetRadioItem.name" placeholder="Name"/>
        </FormItem>
        <FormItem label="Description" class="input">
          <Input v-model="targetRadioItem.description" placeholder="description"/>
        </FormItem>
        <FormItem label="Status" class="input" type="number">
          <Checkbox v-model="targetRadioItem.active">Active</Checkbox>
        </FormItem>
      </Form>
    </Modal>

    <!--update Radio Group -->
    <Modal
      title="Update Modifier Group"
      ok-text="Update group"
      @on-ok="addGroup()"
      @on-cancel="cancel"
      v-model="editRadioGroupModal"
    >
      <Form label-position="top">
        <FormItem label="Description" class="input">
          <Input v-model="targetRadioGroup.description" placeholder="Item description"/>
        </FormItem>
        <Row>
          <Col span="11">
            <FormItem label="Min selectable" class="input">
              <InputNumber
                :min="1"
                :step="1"
                v-model="targetRadioGroup.min_selectable"
                placeholder="Min selectable"
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="2">
            <span style="color: #fff">-</span>
          </Col>
          <Col span="11">
            <FormItem label="Max selectable" class="input">
              <InputNumber
                :min="1"
                :step="1"
                v-model="targetRadioGroup.max_selectable"
                placeholder="Max selectable"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      isGroup: false,
      rest: {},
      updateModal: false,
      modifierGroupModal: false,
      modifierItemModal: false,
      radio_group: {},
      modifierGroup: {
        description: "",
        min_selectable: null,
        max_selectable: null
      },
      modifierItem: {
        name: "",
        description: "",
        price: 0.0,
        img_url: "",
        active: true
      },
      optionItemModal: false,
      option: {
        name: "",
        description: "",
        price: "",
        img_url: "",
        active: true
      },
      /* edit data */
      editOptionModal: false,
      targetOption: {},
      editRadioModal: false,
      targetRadioItem: {},
      editRadioGroupModal: false,
      targetRadioGroup: {}
    };
  },
  computed: {
    ...mapGetters({
      item: "getItem"
    })
  },
  methods: {
    ...mapActions({
      getSpecificItem: "getSpecificItem",
      addRadioGroup: "addRadioGroup",
      addRadioItem: "addRadioItem",
      addOptionItem: "addOptionItem",
      deleteRadioItem: "deleteRadioItem",
      deleteItemOption: "deleteItemOption",
      deleteRadioGroup: "deleteRadioGroup",
      deleteSpecificItem: "deleteSpecificItem",
      deleteItemOption: "deleteItemOption"
    }),
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "Up to five pictures can be uploaded."
        });
      }
      return check;
    },
    cancel() {},
    addGroup() {
      let that = this;
      if (that.modifierGroup.description == "") {
        that.$Message.warning(`Group description Required`);
      } else if (
        that.modifierGroup.min_selectable == null ||
        that.modifierGroup.min_selectable < 0
      ) {
        that.$Message.warning(`min selectable Required`);
      } else if (
        that.modifierGroup.max_selectable == null ||
        that.modifierGroup.max_selectable < 0
      ) {
        that.$Message.warning(`max selectable Required`);
      } else {
        let data = that.modifierGroup;
        data.that = that;
        data.parent_item = that.item.id;
        that.addRadioGroup(data);
      }
    },
    addRItem() {
      let that = this;
      if (that.modifierItem.name == "") {
        that.$Message.warning(`Name Required`);
      } else if (that.modifierItem.description == "") {
        that.$Message.warning(`description Required`);
      } else {
        let data = that.modifierItem;
        data.group = that.radio_group.id;
        data.that = that;
        that.addRadioItem(data);
        that.modifierItem = {
          name: "",
          description: "",
          price: 0.0,
          img_url: "",
          active: true
        };
      }
    },
    updateRest() {
      let that = this;
      let data = {
        name: that.rest.name,
        description: that.rest.description,
        stripe_code: that.rest.stripe_code,
        banner_img_url: that.rest.banner_img_url,
        id: that.rest.id,
        that: that
      };
      that.updateSpecificRest(data);
    },
    goBack() {
      this.$router.back();
    },
    addOption() {
      let that = this;
      if (that.option.name == "") {
        that.$Message.warning(`Name Required`);
      } else if (that.option.description == "") {
        that.$Message.warning(`description Required`);
      } else if (that.option.price == "") {
        that.$Message.warning(`Price Required`);
      } else {
        let data = that.option;
        data.that = that;
        data.restId = this.$route.params.id;
        data.parent_item = that.item.id;
        that.addOptionItem(data);
        that.option = {
          name: "",
          description: "",
          price: "",
          img_url: "",
          active: true
        };
      }
    },
    deleteRadio(option) {
      let that = this;
      this.$Modal.error({
        title: "Delete option",
        content: `Are you sure to delete ${option.name}`,
        okText: "Delete",
        closable: true,
        onOk: () => {
          let data = {
            that: that,
            id: option.id
          };
          that.deleteRadioItem(data);
        }
      });
    },
    deleteOption(option) {
      let that = this;
      this.$Modal.error({
        title: "Delete option",
        content: `Are you sure to delete ${option.name}`,
        okText: "Delete",
        closable: true,
        onOk: () => {
          let data = {
            that: that,
            id: option.id
          };
          that.deleteItemOption(data);
        }
      });
    },
    deleteGroup(group) {
      let that = this;
      this.$Modal.error({
        title: "Delete option Group",
        content: `Are you sure to delete ${group.description}`,
        okText: "Delete",
        closable: true,
        onOk: () => {
          let data = {
            that: that,
            id: group.id
          };
          that.deleteRadioGroup(data);
        }
      });
    },
    deleteItem(item) {
      let that = this;
      this.$Modal.error({
        title: "Delete Item",
        content: `Are you sure to delete ${item.name}`,
        okText: "Delete",
        closable: true,
        onOk: () => {
          let data = {
            that: that,
            id: item.id
          };
          that.deleteSpecificItem(data);
        }
      });
    },
    editOption() {
      let that = this;
      let option = that.targetOption;
      let id = option.id;
      delete option.id;
      let data = {
        id,
        that,
        option
      };
      that.deleteItemOption(data);
    },
    loadData() {
      let that = this;
      let id = this.$route.params.id;
      let data = {
        that,
        id
      };
      this.$Spin.show();
      that.getSpecificItem(data);
    }
  },
  watch: {
    item(newVal, oldVal) {
      let that = this;
      if (newVal.radio_option_groups.length) {
        that.isGroup = true;
      }
    }
  },
  mounted() {
    let that = this;
    let id = this.$route.params.id;
    let data = {
      that,
      id
    };
    this.$Spin.show();
    that.getSpecificItem(data);
  }
};
</script>
<style scoped>
.page {
  max-width: 100vw;
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
  font-family: "Product Sans";
  min-height: 100vh;
}
.ivu-menu {
  background-color: #f8f9fa;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.container--row {
  padding: 0vh 3vw 0vh 3vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input {
  margin-top: 2vh;
}
.bg {
  text-align: center;
}
.bg--image {
  width: 100%;
  height: auto;
}
.itemInfo {
  width: 90%;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: -8vh;
  box-shadow: 1px 1px 1px 1px #d3d3d3;
  margin-top: -10vh;
}
.ivu-input-number {
  width: 100%;
}
.content {
  padding: 1px 1vw 2vh 1vw;
}
.text-justify {
  margin-top: 2px;
  text-align: justify;
}
.content {
  min-height: 84vh;
  width: 100%;
  padding: 2vh 20px 10px 20px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.demo-upload-list {
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.icon--back {
  left: 0;
  align-self: center;
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
