import axios from 'axios'

export default () => {
    return axios.create({
        headers: {
            'Authorization': 'Token 428e43d4f8fe445e1b505fc64ba79db2ad62846c',
            'Content-Type': 'application/json'
        },
        baseURL: 'https://www.dishout.io/api/v1'
    })
}