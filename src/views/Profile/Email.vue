<template>
    <div class="email">
        <el-steps :active="active" align-center class="step">
            <el-step title="步骤1" description="验证旧邮箱"></el-step>
            <el-step title="步骤2" description="旧邮箱验证码"></el-step>
            <el-step title="步骤3" description="新邮箱绑定"></el-step>
            <el-step title="步骤4" description="新邮箱验证码"></el-step>
        </el-steps>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="email_line" label="验证旧邮箱">
                <el-input v-model="formInline.oldemail" placeholder="输入旧邮箱"></el-input>
                <el-button type="primary" class="button" @click="oldemail">获取验证码</el-button>
            </el-form-item>
            <el-form-item class="email_line" label="旧邮箱验证码">
                <el-input v-model="formInline.oldcode" placeholder="旧邮箱验证码"></el-input>
                <el-button type="primary" class="button" @click="oldcode">验证</el-button>
            </el-form-item>
            <el-form-item class="email_line" label="新邮箱绑定">
                <el-input v-model="formInline.newemail1" placeholder="输入新邮箱"></el-input>
                <div class="jiange"></div>
                <el-input v-model="formInline.newemail2" placeholder="输再次入新邮箱"></el-input>
                <el-button type="primary" class="button" @click="newemail">获取验证码</el-button>
            </el-form-item>
            <el-form-item class="email_line" label="新邮箱验证码">
                <el-input v-model="formInline.newcode" placeholder="新邮箱验证码"></el-input>
                <el-button type="primary" class="button" @click="newcode">验证</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
    data(){
        return{
            formInline:{
                oldemail: '',
                oldcode: '',
                newemail1: '',
                newemail2: '',
                newcode: '',
            },
            active:null
        }
    },
    methods:{
       oldemail(){
        this.http({
            url:"api/superchangeemail",
            method:'POST'
        }).then(res=>{
            if(res.data.status=='error'){
                this.$message.error(res.data.msg)
            }else{
                this.$message({
                    type:'success',
                    message:res.data.msg
                })
                this.active=1
            }
        })
       },
       oldcode(){
        this.$http({
            url:'api/superchangeemail',
            method:'PUT',
            data:`tsxt=${this.formInline.oldcode}`,
            headers:{
               'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            if(res.data.status=='error'){
                this.$message.data.msg
            }else{
                this.$message({
                    type:'success',
                    message:res.data.msg
                })
                this.active=2
            }
        })
       },
       newemail(){
          this.$http({
            url:'api/superbindnewemail',
            method:'POST',
            data:`meail1=${this.formInline.newemail1}$email2=${this.formInline.newemail2}`,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
          }).then(res=>{
            if(this.data.status=='error'){
                this.$message.data.msg
            }else{
                this.$message({
                    type:'success',
                    message:res.data.msg
                })
                this.active=3
            }
          })
       },
       newcode(){
          this.$http({
            url:'api/superbindnewemail',
            method:'PUT'
          }).then(res=>{
            if(this.data.status=='error'){
                this.message.data.msg
            }else{
                this.$message({
                    type:'success',
                    message:res.data.msg
                })
                this.active=4
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
    align-items: flex-start;
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