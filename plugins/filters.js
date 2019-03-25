import Vue from 'vue'

Vue.filter('status', function (val) {
    if (val) {
        return 'Active'
    } else {
        return 'Inactive'
    }
})