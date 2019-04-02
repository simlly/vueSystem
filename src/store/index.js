import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store=new Vuex.store({
    state:{
        user:{
            username:'',
            realname:''
        }
    },
    mutations:{
        setUser(state, user){
            state.user = user;
            // 保存数据到本地
            sessionStorage.setItem("username", user.username)
            sessionStorage.setItem("realname", user.realname)
        }
    }
})