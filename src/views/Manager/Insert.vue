<!-- 新增组件 -->
<template>
    <div class="manager-insert bx">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认添加</el-button>
                <el-button @click="resetForm('form')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        const validateUsername = (rule, value, callback) => {
            if (/\w{6,18}/.test(value)) {
                callback();
            } else {
                callback(Error('用户名为6-18位'))
            }
        }
        return {
            form: {
                username: ''
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let formdata = new FormData();
                    formdata.append('username', this.form.username)
                    this.$http({
                        method: 'POST',
                        url: 'api/createsuperuser',
                        data: formdata,
                    }).then(response => {
                        let res = response.data
                        if (res.status == 'error') {
                            this.$message.error('res.msg')
                        } else {
                            this.$alert(`用户名:${res.username}\ n 密码:${res.password}`, '新增账号信息提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'success',
                                        message:`新增用户：${res.username}  成功！`
                                    });
                                }
                            });
                        }
                    })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>

</style>