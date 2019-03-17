import Api from '@/plugins/Api'

export default {
    getAllRest: ({commit}) => {
      Api().get('/restaurant').then((res)=>
       commit('update_rest_list' , res.data)).catch((err) => 
       console.log('err is ' ,err))
    },
    getSpecificRest: ({commit} , data) => {
        Api().get(`/restaurant/${data}`).then((res)=>
        commit('set_rest' , res.data),
        ).catch((err) => 
        console.log('err is ' ,err))
     },
     clearSpecificRest: ({commit}) => {
      commit('clear_rest')
   },
   getSpecificItem: ({commit} , data) => {
    Api().get(`/menu_item/${data}`).then((res) =>
    commit('set_item' ,res.data)
    ).catch((err) => 
    console.log('err is ' ,err))
   },
   clearItem: ({commit} ) => {
    commit('clear_item')
   }
}