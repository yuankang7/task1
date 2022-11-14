import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

// 引入组件 使用懒加载引入
const Login = () => import("@/views/Login/index.vue");
const Layout = () => import("@/Layout/index.vue");
// 首页
const Home = () => import('@/views/Home/index');
// 标题
const Title = () => import('@/views/Title/index');
// 章节
const Chapter = () => import('@/views/Chapter/index');
// 管理员
const Manager = () => import('@/views/Manager/index')
// 新增管理员
const Insert = () => import('@/views/Manager/Insert');
// 个人信息
const Profile = () => import('@/views/Profile/index');
//视频管理
const Video = () => import('@/views/Video/index');
//会员
const Vip = () => import('@/views/Vip/index');
const zfbOrder = () => import('@/views/zfbOrder/index');
const logs = () => import('@/views/Logs/index');
const model = () => import('@/views/Model/index');
const WxOrder = () => import('@/views/WxOrder/index');

 
const routes = [
  {
    path: '/WxOrder',
    component: Layout, 
    children: [
      {
        path: '',
        component: WxOrder,
        meta: {
          title: '模块管理'
        }
      }
    ]
  },
  {
    path: '/model',
    component: Layout, 
    children: [
      {
        path: '',
        component: model,
        meta: {
          title: '模块管理'
        }
      }
    ]
  },
  {
    path: '/logs',
    component: Layout, 
    children: [
      {
        path: '',
        component: logs,
        meta: {
          title: '日志管理'
        }
      }
    ]
  },
  {
    path: '/ZFB',
    component: Layout, 
    children: [
      {
        path: '',
        component: zfbOrder,
        meta: {
          title: '支付宝订单'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redierct:'/home', 
    children: [
      {
        path: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/title',
    component: Layout,
    children: [
      {
        path: '',
        component: Title,
        meta: {
          title: '大标题管理'
        }
      }
    ]
  },
  {
    path: '/chapter',
    component: Layout,
    children: [
      {
        path: '',
        component: Chapter,
        meta: {
          title: '章节管理'
        }
      }
    ]
  },
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/manager',
    component: Layout,
    children: [
      {
        path: '',
        component: Manager,
        meta: {
          title: '管理员查询'
        }
      },
      {
        path: '/insert',
        component: Insert,
        meta: {
          title: '新增管理员'
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    rediect: '/profile/index',
    children: [
      {
        path: "index",
        component: Profile,
        meta: {
          title: '个人信息'
        }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    children: [
      {
        path: "",
        component: Video,
        meta: {
          title: '视频管理'
        }
      }
    ]
  },
  {
    path: '/vip',
    component: Layout,
    children: [
      {
        path: "",
        component: Vip,
        meta: {
          title: '会员管理'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
