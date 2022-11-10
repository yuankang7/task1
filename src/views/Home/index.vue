<template>
  <div>
    <el-upload
      name="avator"
      class="avatar-uploader"
      action="http://81.68.121.52:8000/api/changesuperavator"
      :auto-upload="false"
      :show-file-list="false"
      :headers="header"
      ref="upload"
      :on-change="change"
      :on-success="success"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <el-button @click="submitUpload">确认更改</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj:{
        name:'哇咔咔',
        chapter_id:33
      },
      header: {
        authorization: `Brarer ${this.$store.state.token}`,
      },
      imageUrl: "",
    };
  },
  created() {
    this.imageUrl = this.$store.state.user.avator;
  },
  methods: {
    change(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file.raw);
    },

    success(res) {
      if (res.status == "error") {
        this.$message.error(res.msg);
      } else{
        this.$message({
          type: "success",
          message: "用戶頭像更改成功",
        });
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    a(e) {
      let file = e.target.file[0];
      var reader = new FileReader();
      reader.onload = (e) => {
        this.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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