import Api from '@/plugins/Api'
import Imagur from '@/plugins/imgur'

export default {
    saveItemImage: ({ commit }, data) => {
        Imagur().post('/upload', data).then(res => {
            commit('set_item_img_url', res.data.data.link)
        }).catch((err) => {
            alert(err.response.data.data.error.message)
        })
    },
    addSpecificItem: ({ commit }, data) => {
        let that = data.that
        delete data.that
        Api().post('/menu_item/', data).then((res) => {
            that.$Message.success(`Item ${res.data.name} added`);
            that.refresh()
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteSpecificItem: ({ commit }, data) => {
        let that = data.that
        delete data.that
        Api().delete(`/menu_item/${data.id}`).then((res) => {
            that.$Message.success(`Item deleted`);
            that.goBack()
        }).catch((err) => {
            console.log(err)
        })
    },
    addRadioGroup: ({ commit }, data) => {
        let that = data.that
        delete data.that
        Api().post('/radio_group/', JSON.stringify(data)).then((res) => {
            that.$Message.success(`New Group ${res.data.description} added`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteRadioGroup: ({ commit }, data) => {
        let that = data.that
        delete data.that
        Api().delete(`/radio_group/${data.id}`).then((res) => {
            that.$Message.success(`Option group Deleted`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    },
    addRadioItem: ({ commit, dispatch }, data) => {
        let that = data.that
        delete data.that
        console.log(data)
        Api().post('/radio_item/', data).then((res) => {
            that.$Message.success(`New option ${res.data.name} added`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    },

    deleteRadioItem: ({ commit, dispatch }, data) => {
        let that = data.that
        delete data.that
        Api().delete(`/radio_item/${data.id}`).then((res) => {
            that.$Message.success(`option Deleted`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    },
    addOptionItem: ({ commit }, data) => {
        let that = data.that
        let restId = data.restId
        delete data.that
        delete data.restId
        Api().post('/item_option/', JSON.stringify(data)).then((res) => {
            that.$Message.success(`New option ${res.data.name} added`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteItemOption: ({ commit, dispatch }, data) => {
        let that = data.that
        let id = data.id
        delete data.that
        Api().put(`/item_option/${data.id}`, { data: data.option }).then((res) => {
            that.$Message.success(`option Deleted`);
            that.loadData()
        }).catch((err) => {
            console.log(err)
        })
    },
}