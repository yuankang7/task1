<template>
    <div id="header">
        <div class="left">
            <span :class="className" @click="change"></span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right">
            <el-dropdown trigger="click" class="avator" @command="handleCommand">
                <el-image style="width: 40px; height: 40px" :src="user.avator"></el-image>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="profile">{{ user.username }}</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            className: {
                'el-icon-s-unfold': this.isCollapse,
                'el-icon-s-fold': !this.isCollapse,
                switch: true,
            }
        };
    },
    created() {
        this.className['el-icon-s-unfold'] = this.isCollapse;
        this.className['el-icon-s-fold'] = !this.isCollapse;
        document.title = this.$route.meta.title;
    },
    computed: {
        isCollapse() {
            return this.$store.state.isCollapse;
        },
        user() {
            return this.$store.state.user;
        }
    },
    watch: {
        isCollapse(newvalue) {
            this.className['el-icon-s-unfold'] = newvalue;
            this.className['el-icon-s-fold'] = !newvalue;
        },
        $route(newValue) {
            document.title = newValue.meta.title;
            // console.log(newValue) 
        }
    },
    methods: {
        change() {
            // // $on是绑定，$emit是触发，绑定事件写在aside.vue中
            // this.$EventBus.$emit('changeCollapse');
            // //当点击事件发生后，让原来的两个图标状态取反，达到更改图标的目的
            // this.className['el-icon-s-unfold'] = !this.className['el-icon-s-unfold'];
            // this.className['el-icon-s-fold'] = !this.className['el-icon-s-fold'];
            this.$store.commit('changeIsCollapse');
        },
        handleCommand(command) {
            if (command == 'logout') {
                // 退出登录，删除cookie和vueX里的token
                this.$store.commit('removeToken');//删除vueX里的token
                this.$cookie.remove('rh_id');//删除cookie里的token
                this.$router.push('/login');//删除路由
            } else if (command == 'profile') {
                this.$router.push('/profile/index',()=>{});
            }
        }
        // logout(){

        // }
    }
}
</script>
<style>
#header .el-dropdown {
    height: inherit;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    cursor: pointer;
}

#header .el-dropdown:hover {
    background: rgba(0, 0, 0, .025);

}
</style>
<style scoped>
#header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left {
    height: inherit;
    display: flex;
    align-items: center;
}

.switch {
    padding: 0px 10px;
    font-size: 30px;
    line-height: 60px;
    cursor: pointer;
    transition: all 500ms;

}

.switch:hover {
    background: rgba(0, 0, 0, .025);
}

.right {
    display: flex;
    align-items: center;
    margin-right: 20px;
    height: inherit;
}
</style>