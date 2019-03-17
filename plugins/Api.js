import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://www.dishout.io/api/v1'
    })
}