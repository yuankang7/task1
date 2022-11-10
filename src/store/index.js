import VueX from 'vuex';
import Vue from 'vue';
import axios from '@/axios';
import { url } from '@/axios';

Vue.use(VueX);

export default new VueX.Store({
    state:{
        // 在这个对象里写的东西可一个所有组件共享
        msg:"Hello Vuex",
        isCollapse:false,
        user:{
            username:'',
            avator:'',
            email:'',
            phone:'',
            hender:''
        },
        // VueX在内存条里，cookie在硬盘里
        token:''
    },
    // mutations,actions都是用来更改state的
    // motations存放同步操作
    mutations:{
        removeToken(state){
            // 删除token
            state.token = '';
        },
        saveToken(state,token){
            //在VeuX里保存token
            state.token = token;
        },
        changeIsCollapse(state){
            state.isCollapse = !state.isCollapse;
        },
        saveUserProfile(state,payload) {
            // 将拿到的信息存储在vuex中
            state.user.username = payload.username;
            state.user.avator = payload.avator;
            state.user.phone = payload.phone;
            state.user.email = payload.email;
            if(payload.gender == 1){
                state.user.gender = '男'
            }else {
                state.user.gender = '女'
            }
        }
    },
    // actions中存放异步操作
    actions: {
        getUserProfile({ commit }) {
            return new Promise((resolve, reject) => {
                axios({
                    url:'api/superprofile',//接口
                }).then(res => {
                    if(!res.data.status) {
                        // 成功了，拿到信息了，接下来存储在vuex
                        res.data.avator =`${url}${res.data.avator}`
                        commit('saveUserProfile',res.data);
                        resolve(res.data);
                    } else {
                        reject(res.data);
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
});