import Api from '@/plugins/Api'

export default {
    getAllRest: () => {
        Api().get('/user').then((res)=> console.log('response is' ,res)).catch((err) => console.log('err is ' ,err.message))
    }
}