import Vue from 'vue';
import axios from 'axios';

import {
	Message,
	Loading
} from 'element-ui';

axios.defaults.withCredentials = true; //可以允许跨域携带cookie信息了


//添加请求拦截器
axios.interceptors.request.use(config => {
    if(localStorage.getItem('token')){
		config.headers['timaToken'] = localStorage.getItem('token') //设置默认头部
	}
	//有需要处理
	
	return config;
}, error => {
	//对请求错误做些什么
	return Promise.reject(error);
});

//服务器响应拦截器
axios.interceptors.response.use(response => {
	//有需要处理
   let data = response.data

	if (data.code == 512) {
		// Message({
		// 	message: data.msg,
		// 	type: 'error',
		// 	duration: 5000
		// })
		localStorage.removeItem('token')
		setTimeout(() => {
			window.location.hash = '#/'
			window.location.reload()
			return
		}, 500)
	} else if(data.code == 400){
		// localStorage.removeItem('token')
		// window.location.hash = '#/'
		// window.location.reload()
		// Message({
		// 	message: data.msg,
		// 	type: 'error',
		// 	duration: 5000
		// })
	}

	return response;
}, error => {
	console.log(error)
	return Promise.reject(error);
});

const http = {
    install: (Vue: any, options:object) => {
        Vue.prototype.$http = axios;
    }
}
export default http;