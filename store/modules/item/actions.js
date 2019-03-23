import Api from '@/plugins/Api'

export default {
    addSpecificItem: ({commit} , data) =>{
        console.log(data)
        Api().post('/menu_item/' , data).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    },
    addRadioGroup: ({commit} , data) =>{
        console.log(data)
        Api().post('/radio_group/' , JSON.stringify(data)).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    },
    addRadioItem: ({commit , dispatch} , data) =>{
        let that = data.that 
        let restId = data.restId
        delete data.that 
        delete data.restId
        Api().post('/radio_item/' , JSON.stringify(data)).then((res) => {
            that.$Message.success(`New option ${res.data.name} added`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    },
    addOptionItem: ({commit} , data) =>{
        let that = data.that 
        let restId = data.restId
        delete data.that 
        delete data.restId
        Api().post('/item_option/' , JSON.stringify(data)).then((res) => {
            that.$Message.success(`New option ${res.data.name} added`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    }
}