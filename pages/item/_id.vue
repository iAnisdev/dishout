<template>
    <div class="page">
        <div class="bg">
            <img class="bg--image" src="~/assets/burger.png"/>
        </div>
        <div class="content">
            <h3>Item Name</h3>
            <h4>240-260 cal</h4>
            <p class="text-justify">Modal dialog. It's shown in the floating layer. It's used to guide user to do certain operations.Modal provides two usages: normal component using & encapsulated instance calling.</p>
              <Collapse v-model="value1">
                    <Panel name="1">
                        <span>Select Size </span><span class="min">Minimum 1</span>
                        <div slot="content">
                <RadioGroup vertical>
                    <Radio value="Small">
                        <Icon type="small"></Icon>
                        <span>Small</span>
                    </Radio>
                    <Radio value="Meduim">
                        <Icon type="meduim"></Icon>
                        <span>Meduim</span>
                    </Radio>
                    <Radio value="large">
                        <Icon type="large"></Icon>
                        <span>Large</span>
                    </Radio>
                </RadioGroup>
                </div>
                    </Panel>
                    <Panel name="2">
                        <span>Add Extra Cheese</span><span class="min">(Choose Upto 1)</span>
                        <div slot="content">
                             <CheckboxGroup v-model="cheese">
                            <Checkbox>
                                <span>Cheddar Cheese</span> <span class="price">+$1.00</span>
                            </Checkbox>
                            <Checkbox>
                                <span>Swiss Cheese</span> <span class="price">+$0.60</span>
                            </Checkbox>
                            <Checkbox>
                                <span>American Cheese</span> <span class="price">+$0.50</span>
                            </Checkbox>
                        </CheckboxGroup>
                        </div>
                    </Panel>
                    <Panel name="3">
                        <span>Add Extra Veggies</span>
                        <div slot="content">
                        <CheckboxGroup class="none" v-model="size" size="large">
                            <Checkbox>
                                <span>Luttuce</span>
                            </Checkbox>
                            <Checkbox>
                                <span>Tomato</span>
                            </Checkbox>
                        </CheckboxGroup>
                        </div>
                    </Panel>
                </Collapse>
        </div>
        <footer>
            <h4>Add 1 to cart</h4>
            <h4>$ 8.0</h4>
        </footer>
       </div>
</template>
<script>
export default {
    data (){
        return {
           value1: '1',
           cheese: [],
           size: ['small'],
           disabled: false
        }
    }
}
</script>
<style scoped>
.page{
    max-width: 100vw;
    padding-bottom: 6vh;
}
.bg{
    text-align: center;
}
.bg--image{
    max-height: 30vh;
}
.content{
    padding: 2vh 5vw;
}
.text-justify{
    margin-top: 2px;
    text-align: justify;
}
.ivu-collapse {
    margin-top: 2vh;
}
.min{
    margin-right: 5vw;
    float: right;
    font-weight: bold;
}
.ivu-checkbox-group-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
footer{
    width: 100vw;
    position: fixed;
    bottom: 0;
    background-color: green;
    color: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    font-size: 16px;
    padding: 1vh 20vw;
}
</style>
