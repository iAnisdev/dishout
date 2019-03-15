import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const defaultState = {
  restaurants: [
    {
        "id": 1,
        "owner": 3,
        "name": "kahuna",
        "description": "beach cafe",
        "stripe_code": "___",
        "banner_img_url": "https://vinta-cms.s3.amazonaws.com/media/filer_public/2e/64/2e642aa4-2856-4bba-a2cf-330879eef793/django_rest_framework.png",
        "menus": []
    },
    {
        "id": 1,
        "owner": 3,
        "name": "kahuna",
        "description": "beach cafe",
        "stripe_code": "___",
        "banner_img_url": "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/5/b/w/p5576-144128392855e83f5837ed2.jpg?w=1200&q=100",
        "menus": []
    },
    {
        "id": 2,
        "owner": 5,
        "name": "test",
        "description": "beach cafe",
        "stripe_code": "___",
        "banner_img_url": "https://media.timeout.com/images/103882906/630/472/image.jpg",
        "menus": [
            {
                "id": 1,
                "restaurant": 2,
                "name": "kauna",
                "groups": []
            }
        ]
    }
]
}

const inBrowser = typeof window !== 'undefined';
const state = (inBrowser && window.__INITIAL_STATE__) ? window.__INITIAL_STATE__.page : defaultState;

export default {
  state,
  actions,
  mutations,
  getters
}