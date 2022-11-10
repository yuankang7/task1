<template>
   <div class="edit" v-if="state">
    <div class="edit_form">
        <el-form  label-position="center" label-width="auto" :model="formLabelAlign">
            <el-form-item label="编号">
                <el-input v-model="formLabelAlign.id"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button class="edit_form_right_button" @click="cancleForm('ruleForm')">取消</el-button>
            </el-form-item>
         </el-form>
    </div>
   </div>
</template>

<script>
export default {
    data() {
        return {
            formLabelAlign: {
                id: '',
                name: '',
            }
        }
    },
    props: {
        state: {
            type: Boolean,
            default() {
                return true;
            }
        },
        
    },
    methods: {
        submitForm() {

        },
        cancleForm() {
            this.$emit('cancle');
        }
    }
}
</script>

<style scoped>
.edit_form {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    padding-top: 40px;
}
</style>

<style>
.edit {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 5;
}
.edit .el-form-item__content {
    margin-left: 0 !important;
}
.edit_form_right_button {
    margin-left: 260px !important;
}
</style>