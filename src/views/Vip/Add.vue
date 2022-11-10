<template>
    <div class="vipAdd" v-if="state">
        <el-form
          label-position="right"
          label-width="auto"
          :model="formLabelAlign"
          class="chapter_add">
          <el-form-item label="会员名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="介绍信息">
            <el-input v-model="formLabelAlign.description"></el-input>
          </el-form-item>
          <el-form-item label="原价">
            <el-input v-model="formLabelAlign.origin_price"></el-input>
          </el-form-item>
          <el-form-item label="现价">
            <el-input v-model="formLabelAlign.price"></el-input>
          </el-form-item>
          <el-form-item label="过期时间">
            <el-input v-model="formLabelAlign.expires"></el-input>
          </el-form-item>
          <el-form-item class="el-form-button">
            <el-button type="primary" @click="onSubmit">确认</el-button>
            <el-button type="primary" @click="onCancel" style="background-color: grey;border: none">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
  </template>
  
  <script>
  export default {
      data() {
          return {
              formLabelAlign: {
                  name: '',
                  description: '',
                  origin_price: '',
                  price: '',
                  expires: ''
              }
          }
      },
      props: {
          state: {
              type: Boolean,
              dafault() {
                  return false;
              }
          }
      },
      methods: {
          onSubmit() {
              console.log(Object.keys(this.formLabelAlign));
              let formdata = new FormData();
              formdata.append('name',this.formLabelAlign.name);
              formdata.append('description',this.formLabelAlign.description);
              formdata.append('origin_price',this.formLabelAlign.origin_price);
              formdata.append('price',this.formLabelAlign.price);
              formdata.append('expires',this.formLabelAlign.expires);
              this.$http({
                  url: 'api/vip',
                  method: 'POST',
                  data: formdata
              }).then(res => {
                  if(res.data.status == 'success') {
                      this.$emit('success');
                      this.$emit('cancel');
                      Object.keys(this.formLabelAlign).forEach(item => {
                          this.formLabelAlign[item] = '';
                      })
                  }else {
                      this.$message.error(res.data.msg);
                  }
              }).catch(error => {
                  this.$message.error('连接异常');
              })
          },
          onCancel() {
              this.$emit('cancel');
          }
      }
  }
  </script>
  
  <style scoped>
  .vipAdd {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, .5);
      z-index: 5;
  }
  .chapter_add {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      padding: 20px;
   }
  .vipAdd .el-form-item {
      width: 500px;
  }
  </style>