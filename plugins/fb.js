import vue from 'vue'

vue.prototype.$initFbSDK = () => {
    FB.init({
        appId: '356965585139807',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });
}