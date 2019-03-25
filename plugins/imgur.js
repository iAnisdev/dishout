import axios from 'axios'

export default () => {
    return axios.create({
        headers: {
            'Authorization': 'Client-ID f9af096cec5d5ce'
        },
        baseURL: 'https://api.imgur.com/3'
    })
}