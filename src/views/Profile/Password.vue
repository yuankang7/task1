<template>
    <div class="email">
        <el-steps :active="active" align-center class="step">
            <el-step title="步骤1" description="发送验证码"></el-step>
            <el-step title="步骤2" description="验证码发送成功"></el-step>
            <el-step title="步骤3" description="密码修改成功"></el-step>
        </el-steps>

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="email_line" label="验证邮箱">
                <el-input v-model="formInline.email" placeholder="输入绑定的邮箱号"></el-input>
                <el-button type="primary" class="button" @click="email">获取验证码</el-button>
            </el-form-item>

            <el-form-item class="email_line" label="更换密码">
                <el-input v-model="formInline.code" placeholder="输入新邮箱验证码"></el-input>
                <div class="jiange"></div>
                <el-input v-model="formInline.newpassword1" placeholder="输入新密码"></el-input>
                <div class="jiange"></div>
                <el-input v-model="formInline.newpassword2" placeholder="输再次入新密码"></el-input>
                <el-button type="primary" class="button" @click="newpassword">确认更换</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formInline: {
                email: '',
                newpassword1: '',
                newpassword2: '',
                code: '',
            },
            active: 1
        }
    },
    methods: {
        email() {
            // console.log('发送验证码')
            this.$http({
                url: 'api/superchangepwd',
                method: 'POST',
            }).then(res => {
                // console.log(res);
                if (res.data.status == 'error') {
                    this.$message.error(res.data.msg)
                } else {
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                    this.active = 2
                }
            })
        },
        newpassword() {
            // console.log(3)
            this.$http({
                url: 'api/superchangepwd',
                method: 'PUT',
                data: `text=${this.formInline.code}&pwd1=${this.formInline.newpassword1}&pwd2=${this.formInline.newpassword2}`,
            }).then(res => {
                // console.log(res);
                if (res.data.status == 'error') {
                    this.$message.error(res.data.msg)
                } else {
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                    this.active = 3
                }
            })
        }
    }
}
</script>

<style>
.step {
    margin: 20px;
}

.jiange {
    height: 20px;
}

.demo-form-inline {
    display: flex;
    justify-content: space-evenly;
}

.email_line {
    display: flex;
    width: 300px;
    margin: 10px;
}

.button {
    margin: 10px 0px;
}
</style>