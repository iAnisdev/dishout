export default {
    update_rest_list: (state , list) => {
        state.restaurants = list
    },
    clear_rest_list: (state) => {
        state.restaurants = []
    },
    set_rest: (state , rest) => {
        state.specificRest = rest
    },
    clear_rest: (state) => {
        state.specificRest = {}
    },
    set_item: (state , item) => {
       if(item.radio_option_groups.length > 0){
        item.showRadio = true
       }else{
        item.showRadio = false
       }
        state.item = item
    },
    clear_item: (state) => {
        state.item = {}
    }
}