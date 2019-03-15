export default {
    update_rest_list: (state , list) => {
        state.restaurants = list
    },
    clear_rest_list: (state) => {
        state.restaurants = []
    }
}