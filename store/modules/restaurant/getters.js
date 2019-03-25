export default {
    restList: state => state.restaurants,
    loadRest: state => state.specificRest,
    getItem: state => state.item,
    getGroup: state => state.group,
    getBannerUrl: state => state.rest_img_url
}