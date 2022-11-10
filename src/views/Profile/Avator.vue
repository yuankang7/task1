<template>
  <div class="avator ">
      <el-upload :on-change="change" ref="upload" :headers="header" class="avatar-uploader" :show-file-list="false"
          :auto-upload="false" name="avator" action="http://81.68.121.52:8000/api/changesuperavator">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button @click="submitUpload" class="el-icon-edit">确认更改</el-button>
  </div>
</template>

<script>

export default {
  data() {
      return {
          header: {
              authorization: `Bearer ${this.$store.state.token}`
          },
          imageUrl: ''
      };
  },
  created() {
      this.imageUrl = this.$store.state.user.avator
  },
  methods: {
      submitUpload() {
          this.$refs.upload.submit();
      },
      change(file){
          let result = URL.createObjectURL(file.raw);
          this.imageUrl = result;
      }
  }
}
</script>

<style scoped>
.avator {
  margin-top: 20px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>