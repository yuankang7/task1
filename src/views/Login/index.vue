<template>
    <div class="loginview">
        <div class="login-form">
            <h1 class="login-title">系统登录</h1>
            <el-input prefix-icon="el-icon-user" class="login-input" v-model="login.username" placeholder="请输入内容"
                clearable></el-input>
            <el-input prefix-icon="el-icon-lock" class="login-input" placeholder="请输入密码" v-model="login.password"
                show-password clearable></el-input>
            <div class="vcode">
                <el-input v-model="login.text" class="login-input v-input" prefix-icon="el-icon-key"
                    placeholder="请输入验证码"></el-input>
                <img :src="imgsrc" class="v-img" @click="changevcode">
            </div>
            <el-button class="login-submit" type="primary" @click="superlogin">登录</el-button>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            login: {
                username: '',
                password: '',
                text: '',
                uuid: ''
            },
            imgsrc: '',
            time: ''
        }
    },
    created() {
        this.reRender();
        this.intervalRerender();
    },
    methods: {
        reRender() {
            let uuid = this.uuid();
            this.login.uuid = uuid;
            this.imgsrc = `http://81.68.121.52:8000/api/generateimagecode?uuid=${uuid}`;
        },
        uuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        intervalRerender() {
            clearInterval(this.time);
            this.time = setInterval(() => {
                this.reRender();
            }, 60 * 1000);
        },
        changevcode() {
            this.reRender();
            this.intervalRerender();
        },
        superlogin() {
            // $http 用于读取远程服务数据
            this.$http({
                url: "api/supersignin",
                method: "POST",
                data:`username=${this.login.username}&password=${this.login.password}&text=${this.login.text}&uuid=${this.login.uuid}`, //其中之一的转换方法  自己写form 
            })
            //then 方法是异步执行，就是当then前的方法执行完后在执行then()内部的程序
            // 这样就避免了数据没获取到的问题
            // 语法是promise.then(onCompleted,onRejected);
            // Promise （必须）.Promise对象
            // onCompleted （必须） 承诺成功完成时要运行的履行处理程序函数
            // onRejected （可选） 承诺被拒绝是要运行的错误处理程序函数
                .then(res => {
                // Promise 实例添加状态改变时的回调函数。then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。
                    console.log(res.data);
                    if (res.data.status == "error") {
                        this.$message.error(res.data.msg);
                    } else {
                        // 将后端给的Token存起来 方便后期使用 使用cookie
                        let date = new Date();
                        date.setHours(date.getHours() + 10 ); 
                        this.$cookie.set("rh_id",res.data.token,{expires:date});
                        this.$store.commit('saveToken',res.data.token);//将token存储到vuex里
                        this.$message({
                            message: `${res.data.username}-${res.data.msg}`,
                            type: 'success'
                        });
                        this.$router.push('/')
                    }
                })
                .catch(error => {
                // Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
                    this.$message.error("登录异常，请稍后再试");
                });
                this.login.username = "";
                this.login.password = "";
                this.login.text = "";
                this.reRender();
                this.intervalRerender();
        }
    }
}
</script>

<style>
.login-input input:focus {
    border: 1px solid hsla(0, 0%, 100%, .1);
}

.login-input input {
    background-color: transparent;
    padding: 12px 5px 12px 15px;
    border: 1px solid hsla(0, 0%, 100%, .1);
    color: #fff;
    height: 47px;
}
</style>

<style scoped>
.loginview {
    height: 100%;
    background-color: #2d3a4b;
}

.login-form {
    width: 450px;
    height: 200px;
    padding: 160px 35px 0;
    margin: 0 auto;
    /* background-color: pink; */
    /* overflow: hidden; */
}

.login-title {
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
}

.login-input {
    margin-bottom: 30px;
}

.login-submit {
    width: 100%;
}

.vcode {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.v-img {
    height: 40px;
    cursor: pointer;
}

.v-input {
    width: 50%;
    margin: 0 !important;
}
</style>