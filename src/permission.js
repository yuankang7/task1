// 导航守卫

// 先拿路由
import router from "@/router";
import cookie from "js-cookie";
import store from "@/store";
import { Message } from 'element-ui'
// 路由的保安系统，next()是那把锁
router.beforeEach(async (to, from, next) => {
    // 每次进入路由都要去cookie中 读取一次 效率太低
    // 这么频繁的操作 就必须要进行优化
    /* 
        先看看VueX中有没有Token
        如果没有就再去cookie中检查有没有Token
        如果cookie没有Token说明这个用户没有登陆过
        然后我们在检查用户去的是不是登录页面
        如果是登录页面 那就直接放行
        如果去得不是登录页面
        那就强制去登录页面
        如果cookie中有Token 就把cookie中的Token保存在Vuex中方便下次使用
        但是这部分判断只能保证有Token 并不能确定Token是不是仿造的
    */


    let token = store.state.token;
    if (!token) {
        // 如果这里面没有token 说明用户刷新了 VUEX中没有token了 将cookie 中的token 再次存放在Vuex中
        token = cookie.get('rh_id');//赋值
        if (!token) {
            // cookie里没有 代表你没登录
            if (to.path == '/login') {
                return next();
            } else {
                return next('/login');
            }
        };
        store.commit('saveToken', token);//存储token
    };
    /*
        代码进行到这里 可以保证又Token
        接下来验证Token
        如何验证 很简单 直接那这个人 的Token去获取一下个人信息
        如果能拿到信息 你的Token肯定没问题 如果拿不到 你的Token就是伪造的

        先检查Vuex中有没有个人信息
        如果有 直接进行 路由的判断
        如果没有 就去获取个人信息 
        获取个人信息的代码我们写在了Vuex 中的Actions里面
        获取个人信息的请求代码完全可以写在登录页面或者首页的created()中
        个人信息组件也可能需要个人信息
        在这种情况下 多个组件要使用这份数据 我们就把代码封装在VueX中
        由于这个操作是异步的，所以要封装在 actions中
        action 中的操作我们需要得知成功或者失败的状态
        所以我将actions 设计为 返回一个promise 来达到状态的识别
        
    */

    //如果vueX中没有个人信息 再获取个人信息
    let userProfile;
    if (store.state.user.username) {
        //如果有个人信息，就不用再去获取个人信息
        userProfile = store.state.user;
    } else {
        try {
            userProfile = await store.dispatch('getUserProfile');
            // console.log(userProfile);
        } catch (error) {
            console.log(error);
        }
    }

    //如果用户没有绑定邮箱，就一直提醒绑定邮箱
    // console.log(store.state.user.email);
    if (!store.state.user.email) {
        Message({
            type: 'warning',
            message: '请绑定邮箱再进行操作'
        })
    }

    // 如果没有个人信息 去获取个人信息
    // console.log(userProfile);
    //检测有没有个人信息
    // const token = cookie.get('rh_id');
    if (!userProfile) {//如果没有个人信息
        if (to.path == '/login') {//没登录去登录页面
            next();//放你去登录页面
        } else {//没登录去其他页面
            cookie.remove('rh_id')
            next('/login');//返回登录页面
        }
    } else {//有登录信息登录过的人 又翻墙来登录页面 哪来的回哪去
        if (to.path == '/login') {
            next(from);
            //from是一个对象里面有path next()传参可以接受字符串，对象
            // 对象写path ，from刚好是一个对象
        } else {//登陆过去其他页面
            next();//放行
        }
    }





    // 如果用户直接去登录页面，那么我放你走
    // if (to.path == '/login') {
    //     next();
    // } else { //去得是非登录页面
    //     //看看有没有vip 如果有卡 检查一下是不是假的 如果都好着 就放你走
    //     // 如果检测过程中有一项有问题就直接送他去login路由

    //     if (!token) {
    //         // 如果没有会员卡
    //         next('/login');
    //     } else {
    //         next();
    //     }
    //     //如果有会员卡 检测会员卡是不是假的
    //     // 如何验证 用你的Token去获取一下个人信息 能拿到就是对的卡
    //     // if() {

    //     // }
    // }

});

export default router;

// router里暴露了一个路由，被permission引用了
// permission引过来又加了一个导航守卫，然后又把路由暴露出去了
// 所以直接把main.js里导入router的那一步改成引用persission.js
// 这样同样也能拿到router这样的话两份代码都能执行起来
// 如果只在permission里暴露的话，在main.js里引入,permission这份代码并不会执行