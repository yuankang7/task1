<template>
    <div class="mark" v-if="state">
        <div class="chapter_form">
            <el-form ref="ruleForm" :rules="rules" label-position="right" label-width="auto" :model="formLabelAlign">
                <el-form-item label="新增课题名称" prop="name">
                    <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                    <el-button @click="cancelForm('ruleForm')">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formLabelAlign: {
                name: ""
            },
            rules: {
            },
        }
    },
    props:{
        state:{
            type:Boolean,
            default(){
                return false
            }
        },
        getpkname:String
    },
    methods:{
        submitForm(name){
            console.log(this.getpkname)
        },
        cancelForm(){
            this.$emit('cancle')
        },

    }

}
</script>

<style scoped>
.chapter_form {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
}
</style>

<style>
.mark {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 5;
}
</style>