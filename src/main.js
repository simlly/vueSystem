import Vue from 'vue'
import App from './App.vue'
// 1.引入axios
import axios from 'axios';
// 1.引入element-ui
import ElementUI from "element-ui";
// 2.引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

// 引入富文本
import VueQuillEditor from 'vue-quill-editor';

// 引入路由
import VueRouter from "vue-router"
// 引入组件
import Login from "./pages/Login.vue"
import Admin from "./pages/Admin.vue"
import CategoryList from "./pages/CategoryList.vue"
import GoodList from "./pages/GoodList.vue"
import GoodAdd from "./pages/GoodAdd.vue"
import GoodEdit from "./pages/GoodEdit.vue"
import CategoryAdd from "./pages/CategoryAdd.vue"
// 引入store
import store from './store/index'
// 3.全局注册组件
Vue.use(ElementUI);
// 注册路由
Vue.use(VueRouter)
// 注册富文本
Vue.use(VueQuillEditor)
// 非生产环境
Vue.config.productionTip = false
// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;
// 设置路径
axios.defaults.baseURL="http://localhost:8899";
const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/login', component: Login ,meta:'登录'},
  { path: '/admin', 
    component: Admin,
    redirect: '/admin/goods-list',
    meta:'管理后台',
    children: [
      { path: 'goods-list', component: GoodList,meta:'商品列表' },
      { path: 'goods-add', component: GoodAdd, meta:'新增列表'},
      { path: 'goods-edit/:id', component: GoodEdit, meta:'编辑列表'},
      { path: 'category-list', component: CategoryList, meta:'栏目列表'},
      { path: 'category-add', component: CategoryAdd, meta:'新增栏目'},
      
    ]
  }
]


//创建路由对象 配置路由
const router = new VueRouter({routes})
new Vue({
  // 路由挂载根实例
  router,
  store,
  render: h => h(App),
}).$mount('#app')




