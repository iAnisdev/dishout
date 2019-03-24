import Api from '@/plugins/Api'

export default {
    getAllRest: ({commit} , data) => {
      Api().get('/restaurant').then((res)=> {
         commit('update_rest_list' , res.data)
      }).catch((err) => {
         console.log('err is ' ,err)
      })
    },
    getSpecificRest: ({commit} , data) => {
       let that = data.that
        Api().get(`/restaurant/${data.id}`).then((res)=>{
         commit('set_rest' , res.data)
        }).catch((err) => 
        console.log('err is ' ,err))
        that.$Spin.hide();
     },
     clearSpecificRest: ({commit}) => {
      commit('clear_rest')
   },
   deleteRest: ({commit , dispatch} , data) => {
      let that = data.that
       Api().delete(`/restaurant/${data.id}`).then((res)=>{
         that.$Message.success(`Restaurant Deleted`);
         dispatch('getAllRest')
       }).catch((err) => 
       console.log('err is ' ,err))
       that.$Spin.hide();
    },
    clearSpecificRest: ({commit}) => {
     commit('clear_rest')
  },
   addNewRestaurant: ({commit} , data ) => {
      let that = data.that 
      delete data.that
      Api().post('/restaurant/' , JSON.stringify(data)).then((res)=>{
         that.$Message.success(`Restaurant ${res.data.name} added`);
        that.$router.push({path: `./${res.data.id}`});
      }
      ).catch((err) => 
      console.log('err is ' ,{err}))
      that.$Spin.hide();
   },
   updateSpecificRest: ({commit} , data ) => {
      let that = data.that 
      delete data.that
      Api().put('/restaurant/' , JSON.stringify(data)).then((res)=>{
         console.log(res)
      }
      ).catch((err) => 
      console.log('err is ' ,{err}))
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
   },
   addNewMenu: ({commit} , data) => {
      let that = data.that
      delete data.that
      Api().post('/menu/' , JSON.stringify(data)).then((res) => {
         that.$Message.success(`New Menu ${res.data.name} added`);
      }).catch((err) => {
         console.log({err})
      })
   },
   updateSpecificMenu: ({commit} , data) => {
      console.log(data)
      Api().put('/menu/' , JSON.stringify(data)).then((res) => {
         console.log(res)
      }).catch((err) => {
         console.log(err)
      })
   },

   deleteSpecificMenu: ({commit} , data) => {
      console.log(data)
      Api().delete('/menu/' , JSON.stringify(data)).then((res) => {
         console.log(res)
      }).catch((err) => {
         console.log(err)
      })
   },
   getSpecificMenuGroup: ({commit} , data) => {
      let that = data.that
      delete data.that
      Api().get(`/menu_group/${data.id}`).then((res) => {
         commit('set_group' , res.data)
      }).catch((err) => {
         console.log({err})
      })
      that.$Spin.hide()
   },
   updateSpecificMenuGroup: ({commit} , data) => {
      let that = data.that
      delete data.that
      Api().put('/menu_group/' , JSON.stringify(data)).then((res) => {
         console.log(res)
      }).catch((err) => {
         console.log({err})
      })
      that.$Spin.hide()
   },
   addNewMenuGroup: ({commit , dispatch} , data) => {
      let that = data.that
      let restId = data.restId
      let obj = {id: restId , that: that}
      delete data.that
      delete data.restId
      Api().post('/menu_group/' , JSON.stringify(data)).then((res) => {
         dispatch('getSpecificRest' , obj)
         that.$Message.success(`New Menu group ${res.data.name} added`);
      }).catch((err) => {
         console.log({err})
      })
   },
}