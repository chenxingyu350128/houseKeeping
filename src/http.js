import Axios from "axios"
import qs from "querystring"
import store from './store'
import vuetifyToast from "vuetify-toast"
import router from './router'

const api = Axios.create({
  baseURL : 'http://work.huanghai.fun',
  // baseURL: 'http://mobile.yinaf.com',
  // baseURL: "http://192.168.1.101:8090/yinaf",
  timeout: 5000
});
// 请求拦截
api.interceptors.request.use(
  function(config) {
    let token = localStorage.getItem("token")
    if(process.env.NODE_ENV=='production'){

      if (token) {
        config.headers = {
          token
        };
      }
    }
    if (config.method === "post") {
      console.log(config.url);
      console.log(config.baseURL +'/mobile/user/sendMessage');
      if (config.url != "/mobile/user/sendMessage"){
        
        config.data = qs.stringify(config.data)
        config.headers['Content-Type']='application/x-www-form-urlencoded'
      }
      else{
        console.log('form-dataform-dataform-data');
        
        config.headers['Content-Type'] = 'multipart/form-data'
      }
      console.warn(config);
      
    }
    store.dispatch('SetLoading', true)
    // console.log(config);
    // console.log(config.url);
    return config;
  },
  function(err){
    // setTimeout(() => {
      // store.dispatch('SetLoading', false)
    // }, 300);
    console.error(err)
     
    return err;
  }
);
//响应处理,带token
api.interceptors.response.use(
  response => {
    if (response.data.code==5107){
      store.commit('CLEAR_STATE')
    }
    if (response.data.code==5120){
      store.commit('CLEAR_STATE')
    }
    if (!response.data.success&&response.data.code!='2019') {
      vuetifyToast.show({
        text: response.data.msg
      });      
    }
    setTimeout(() => {
      store.dispatch('SetLoading', false)
    }, 300);

    return response;
  },
  error => {
    console.log(error);
    setTimeout(() => {
      store.dispatch('SetLoading', false)
    }, 300);
    // return Promise.resolve(error.response);
  }
);
api.all = Axios.all
export default { api };
