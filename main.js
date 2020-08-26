import Vue from 'vue'
import App from './App' 
  

import store from './store'

import {Request} from '@/utils/request' 

var http = new Request(); 

Vue.config.productionTip = false

Vue.prototype.$http = http;
Vue.prototype.$store = store;
 
App.mpType = 'app'

const app = new Vue({ 
	...App
})
app.$mount()
