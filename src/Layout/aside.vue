<template>
  <el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#304156"
      text-color="rgb(191, 203, 217)" router>
      <el-menu-item index="/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/manager">
          <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>管理员</span>
          </template>
          <el-menu-item index="/insert">新增管理员</el-menu-item>
          <el-menu-item index="/manager">管理员查询</el-menu-item>
      </el-submenu>
      <el-menu-item index="/title">
          <i class="el-icon-reading"></i>
          <span slot="title">大标题管理</span>
      </el-menu-item>
      <el-menu-item index="/chapter">
          <i class="el-icon-copy-document"></i>
          <span slot="title">章节管理</span>
      </el-menu-item>
      <el-menu-item index="/video">
          <i class="el-icon-video-camera"></i>
          <span slot="title">视频管理</span>
      </el-menu-item>
      <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">模块管理</span>
      </el-menu-item>
      <el-menu-item index="/vip">
          <i class="el-icon-s-custom"></i>
          <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="/ZFB">
          <i class="el-icon-sold-out"></i>
          <span slot="title">支付宝订单</span>
      </el-menu-item>
      <el-menu-item index="8">
          <i class="el-icon-sold-out"></i>
          <span slot="title">微信订单</span>
      </el-menu-item>
      <el-menu-item index="9">
          <i class="el-icon-s-order"></i>
          <span slot="title">登录日志</span>
      </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
      return {
          // isCollapse: false
          active: '/'
      };
  },
  watch:{
      $route(newValue){
          this.active = newValue.path
      }
  },  
  created() {
      this.active = this.$route.path;
  },
  computed: {
      isCollapse() {
          return this.$store.state.isCollapse;
      }
  },
  // created(){
  //     //绑定事件 组件一旦渲染 立即给这个组件绑定了一个自定义事件名为
  //     //changeCollapse
  //     this.$EventBus.$on('changeCollapse', () => {
  //         this.isCollapse = !this.isCollapse;
  //     })
  // }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: inherit;
}
</style>