<template>
    <div>
        <img class="bg--image" src="~/assets/bg.jpeg"/>
         <Card>
            <h3>{{restaurant.name}}</h3>
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
            
    </Card>
    <div class="container">
        <Select>
            <Option v-for="(item , index) in restaurant.menu" :value="item.name" :key="index">
                <span>{{item.name}}</span>
                <span style="float:right;color:#ccc">{{item.timing}}</span>
            </Option>
            </Select>
    </div>
     
     <div style="margin-top: 5vh;">
     <Card dis-hover>
         <Row class="row--justify">
            <Col span="14">
            <h4>Hamburger</h4>
            <p style="margin-top: 1px;">hamburger Beefburger or burger </p>
            </Col>
            <Col span="8">
                <img src="~/assets/burger.png" alt="burger" class="item--img">
            </Col>
         </Row>
        </Card>
        <Card dis-hover style="margin-top: 2vh;">
         <Row class="row--justify">
            <Col span="14">
            <h4>Pizza</h4>
            <p style="margin-top: 1px;">Pizza is a savory dish of Italian origin</p>
            </Col>
            <Col span="8">
                <img src="~/assets/pizza.png" alt="burger" class="item--img">
            </Col>
         </Row>
        </Card>
        </Card>
        <Card dis-hover style="margin-top: 2vh;">
         <Row class="row--justify">
            <Col span="14">
            <h4>French fries</h4>
            <p style="margin-top: 1px;">French fries, or simply fries</p>
            </Col>
            <Col span="8">
                <img src="~/assets/fries.png" alt="burger" class="item--img">
            </Col>
         </Row>
        </Card>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            menuTiming: '',
            restaurant: {
                name: 'Mcdonald',
                cuisines:['American' , 'Fast food' , 'Pizza' , 'Burger'],
                menu: [{
                    name: 'Breakfast',
                    timing: '06:00 AM to 10:30 AM'
                },{
                    name: 'Lunch',
                    timing: '12:00 PM to 2:30 PM'
                },{
                    name: 'Dinner',
                    timing: '06:00 PM to 19:30 PM'
                }]
            }
        }
    }
}
</script>
<style scoped>
.bg--image{
    width: 100%;
    max-height: 30vh;
}
.ivu-card{
    width: 90vw;
    margin: auto;
    top: -3vh;
}
.cuisine--list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.row{
    margin-left:1vw;
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.row--justify{
    margin-left:1vw;
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
</style>

