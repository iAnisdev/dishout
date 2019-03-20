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
   deleteRest: ({commit} , data) => {
      let that = data.that
       Api().delete(`/restaurant/${data.id}`).then((res)=>
       console.log(res)
       ).catch((err) => 
       console.log('err is ' ,err))
       that.$Spin.hide();
    },
    clearSpecificRest: ({commit}) => {
     commit('clear_rest')
  },
   addNewRestaurant: ({commit} , data ) => {
      let  headers = {
         'Authorization': 'Token 17aff8f22e1c8c7d754203637e3317f001fc92d4',
         'Content-Type': 'application/json'
         }
      let that = data.that 
      delete data.that
      console.log(data)
      Api().post('/restaurant/' , data  , {headers : headers}).then((res)=>
      console.log(res)
      ).catch((err) => 
      console.log('err is ' ,err))
      that.$Spin.hide();
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