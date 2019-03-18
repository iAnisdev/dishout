import Api from '@/plugins/Api'

export default {
    getAllRest: ({commit} , data) => {
      let that = data
      that.$Spin.show();
      Api().get('/restaurant').then((res)=> {
         commit('update_rest_list' , res.data)
         that.$Spin.hide();
      }).catch((err) => {
         console.log('err is ' ,err)
         that.$Spin.hide();
      })
    },
    getSpecificRest: ({commit} , data) => {
       let that = data.that
        Api().get(`/restaurant/${data.id}`).then((res)=>
        commit('set_rest' , res.data),
        ).catch((err) => 
        console.log('err is ' ,err))
        that.$Spin.hide();
     },
     clearSpecificRest: ({commit}) => {
      commit('clear_rest')
   },
   getSpecificItem: ({commit} , data) => {
      let that = data.that
      that.$Spin.show()
      Api().get(`/menu_item/${data.id}`).then((res) =>
      commit('set_item' ,res.data),
      that.$Spin.hide()
      ).catch((err) => 
      console.log('err is ' ,err),
      that.$Spin.hide()
      )
      },
   clearItem: ({commit} ) => {
    commit('clear_item')
   }
}