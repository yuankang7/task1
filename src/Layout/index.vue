<!-- 首页 -->
<template>
  <div id="home">
      <el-container>
          <!-- 侧边栏 -->
          <el-aside width="auto">
              <Aside></Aside>
          </el-aside>
          <el-container>
              <!-- 头部 -->
              <el-header>
                  <Header></Header>
              </el-header>
              <!-- 主内容 -->
              <el-main>
                  <!-- 渲染二级路由 -->
                  <keep-alive include="Title">
                      <router-view></router-view>
                  </keep-alive>
              </el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
//我需要在首页获取个人信息
/*
  获取个人信系需要发送请求
  请求需要携带token
  拿token只能去cookie里拿
  cookie操作是在硬盘中操作，效率低下
  VueX操作效率高，因为VUEX中的数据是存放在内存条中的
  但是VueX中的数据只要浏览器已刷新就全没了
  我们要在导航守卫中进行检查
  先去看我们的VueX中有没有Token 如果有 就正常走
  如果没有 我们就去检查cookie中有没有 cookie中有Token，我们把cookie
  中的token再次存放在 Vuex中 然后后续再去使用VueX中的token打到最大效率
*/
import Aside from './aside.vue';
import Header from './header.vue'
import { url } from '@/axios';
export default {
  components: {
      Aside,
      Header
  },
  data() {
      return {
          // user: {
          //     username: "",
          //     avator: ""
          // }
      };
  },
  computed: {
      // msg() {
      //     return this.$store.state.msg;
      // }
  },
  // created() {
  //     let token = this.$cookie.get("rh_id");
  //     // 防翻墙功能
  //     if (!token) {
  //         // 如果没有token
  //         this.$message.error("请先登录");
  //         return this.$router.push('/login')
  //     }
  //     // console.log(token)
  //     // 发请求
  //     this.$http({
  //         url: "api/superprofile",
  //         headers: {
  //             authorization: `Bearer ${token}`
  //         }
  //         // 前端需要传递Token来获取详情信息 需要在请求头中添加authorization字段 属性值为 Bearer 你的Token
  //         // 变相的验证Token状态 前端拿到参数后检查 email属性 如果没有email 就弹框让用户绑定邮箱
  //         // 前端利用这个判断登录状态
  //         // 头像需要前端不全服务器地址 例如当前服务器环境http://127.0.0.1:8000/
  //     }).then(res => {
  //         if (res.data.status) {
  //             // 判断是否有status
  //             this.$message.error(res.data.msg);
  //         } else {
  //             // 正常展示你的用户名和你的头像
  //             this.user.username = res.data.username;
  //             this.user.avator = `${url}${res.data.avator}`;
  //         }
  //         // console.log(this.user.avator)
  //         // console.log(res.data);
  //     }).catch(error => {
  //         this.$message.error('接口错误')
  //     });
  // },
  methods: {
      logout() {
          this.$cookie.remove("rh_id");
          this.$router.push('/login');
      },
      cd() {
          //通过mustations修改state的值
          // mustations修改的值需要commit才能调用
          this.$store.commit('changeMsg')
      }
  }
}
</script>
<style scoped>
#home {
  height: inherit;
  background-color: #f0f2f5;
}
</style>
<style>
.el-header {
  padding: 0px;
  background-color: #fff;
}
.bx {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-container,.el-aside {
  height: inherit;
}
</style>
<!-- api文档 -->
<!-- https://www.apifox.cn/apidoc/shared-99c774c4-ed83-4efc-83eb-f841b43caf3d/api-29046232  -->
