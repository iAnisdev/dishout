import axios from 'axios'

export default () => {
    return axios.create({
        headers: {
        'Authorization': 'Token 5822cd005a14cf7212bffb51c2bab69d87460dae',
        'Content-Type': 'application/json'
        },
        baseURL: 'https://www.dishout.io/api/v1'
    })
}