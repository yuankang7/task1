<!-- 个人信息 -->
<template>
    <div class="profile">
        <div class="left">
            <div class="profile_top">
                <h3>个人信息</h3>
            </div>
            <Avator class="avator"></Avator>
            <el-descriptions class="table" :column="1" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        用户名
                    </template>
                    {{ user.username }}
                </el-descriptions-item>

                <el-descriptions-item class="phone">
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>
                    {{ user.phone }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        性别
                    </template>
                    {{ user.gender }}
                </el-descriptions-item>

                <el-descriptions-item v-if="user.email">
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        邮箱
                    </template>
                    {{ user.email }}
                </el-descriptions-item>

                <el-descriptions-item v-else="user.email">
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        邮箱
                    </template>
                    <el-input placeholder="请输入内容" v-model="email" clearable class="input-email">
                    </el-input>
                    <el-button @click="sendSMS">发送邮箱验证码</el-button>
                </el-descriptions-item>

            </el-descriptions>
        </div>
        <div class="right">
            <Email v-if="qwq"></Email>
            <Password v-else></Password>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import Avator from './Avator.vue'
import Email from './Email.vue'
import Password from './Password.vue'
export default {
    components: {
        Avator,
        Email,
        Password
    },
    data() {
        return {
            email: '',
            activeIndex: '1',
            activeIndex2: '1',
            qwq: true,

        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async sendSMS() {
            let formdata = new FormData();
            formdata.append('email', this.email)
            const response = await this.$http({
                url: "api/superbindemail",
                method: "POST",
                data: formdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            let res = response.data;
            if (res.status == 'error') {
                this.$message(res.msg);
            } else {
                let { value } = await this.$prompt('请输入邮箱验证码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /^\w{4}$/g,
                    // inputErrorMessage: '验证码格式不正确'
                })
                let response = await this.$http({
                    method: 'PUT',
                    url: "api/superbindemail",
                    data: `text=${value}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                let res = response.data;
                if (res.status == 'error') {
                    this.$message.error(res.msg)
                } else {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                }
            }
        },
        qwqq() {
            this.qwq = true;
        },
        aqa() {
            this.qwq = false;
        },
        handleSelect(key, keyPath) {
            console.log(key);
            console.log(keyPath);
        }
    }
}


</script>

<style scoped>
.table {
    padding: 10px;
}

h3 {
    margin: 0;
    line-height: 50px;
    color: #fff;
    text-align: center;
}

.profile_top {
    height: 50px;
    background-color: rgb(48, 65, 86);
}

.avator {
    text-align: center;
    margin-bottom: 10px;
}

.left {
    min-width: 350px;
    width: 30%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.right {
    width: 65%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.profile {
    display: flex;
    justify-content: space-between;

}

.input-email {
    width: 250px;
    margin-right: 30px;
}
</style>