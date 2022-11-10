<template>
  <div class="vip">
    <Add :state="state" @cancel="cancel" @success="success"></Add>
    <Edit :state="sta" :vipData="vipData" @cancel="cancel" @success="success"></Edit>
    <div class="vip-add">
      <el-button class="vip-add-button" @click="onAdd">新增vip</el-button>
    </div>      
    <el-table class="vip-table"
    :data="tableData"
    style="width: 100%">
    <el-table-column prop="name" label="会员名"></el-table-column>
    <el-table-column prop="description" label="介绍信息"></el-table-column>
    <el-table-column prop="expires" label="剩余时间"></el-table-column>
    <el-table-column prop="create_time" label="创建时间"></el-table-column>
    <el-table-column prop="update_time" label="修改时间"></el-table-column>
    <el-table-column prop="origin_price" label="原价" width="120px"></el-table-column>
    <el-table-column prop="price" label="现价" width=120px></el-table-column>
    <el-table-column label="操作">
      <template #default="scope"><!-- 插槽 -->
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Add from './Add.vue';
import Edit from './Edit.vue';
export default {
  components: {
    Add,
    Edit
  },
  data() {
    return {
      tableData: [],
      fullscreenLoading: false,
      state: false,
      sta: false,
      vipData: {},
    }
  },
  created() {
    this.reVip();
  },
  methods: {
    reVip() {
      this.$http({
        url: 'api/vip'
      }).then(res => {
        if(res.data.status == 'error') {
          this.$message.error(res.data.msg);
        }else {
          res.data.data.forEach(item => {
            item.create_time = new Date(item.create_time).toLocaleString();
            item.update_time = new Date(item.update_time).toLocaleString();
          })
          this.tableData = res.data.data;
        }
      }).catch(error => {
        this.$message.error('连接异常');
      })
    },
    onAdd() {
      this.state = true;
    },
    handleEdit(index,row) {
      this.sta = true;
      row.id = row.id.toString();
      this.vipData = row;
    },
    handleDelete(index,row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$http({
            url: 'api/vip',
            method: 'DELETE',
            data: `pk=${row.id.toString()}`,
            headers: {
              'Content-type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            this.fullscreenLoading = false;
            let response = res.data;
            if(response.status == 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.reVip();
            }else {
              this.$message.error(response.msg)
            }
          }).catch(error => {
            this.$message.error('连接异常')
          })
        }).catch(() => {
          this.fullscreenLoading = false;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    cancel() {
      this.state = false;
      this.sta = false;
    },
    success() {
      this.reVip();
    }
  }
}
</script>

<style scoped>
.vip {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.vip-add {
  background-color: rgb(153, 161, 170);
}
.vip-add-button {
  border-radius: 3px;
}
</style>