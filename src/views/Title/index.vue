<template>
  <div>
    <header class="title_header">
      <el-button type="primary" @click="showAdd">新增标题</el-button>
    </header>
    <Add :state="state" @cancle="cancle" @success="success"></Add>    <!-- 增加 -->
    <Edit :state="statee" @cancle="cancle"></Edit>  <!-- 编辑 -->
    <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column prop="id" label="编号" sortable></el-table-column>
    <el-table-column prop="name" label="名称" sortable></el-table-column>
    <el-table-column prop="create_time" label="创建日期" sortable></el-table-column> 
    <el-table-column prop="update_time" label="更新日期" sortable></el-table-column>
    <el-table-column label="操作">
      <template #default="scope"><!-- 插槽 -->
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"  v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Add from './Add.vue';
import Edit from './Edit.vue';
export default {
  name: 'Title',
  components: {
    Add,
    Edit
  },
  data() {
    return {
     tableData: [],
     state: false,
     statee: false,
     fullscreenLoading: false
    }
  },
  created() {
   this.rerenderTableData();
  },
  methods: {
    rerenderTableData() {
      this.$http({
      url: 'api/classify',
      }).then(res => {
        let response = res.data;
        if(response.status == 'success') {
          response.data.forEach(item => {
            item.create_time = new Date(item.create_time).toLocaleString();
            item.update_time = new Date(item.update_time).toLocaleString();
          });
          this.tableData = response.data;
        }else {
          this.$message.error(response.msg);
        }
      });
    },
    handleEdit(index, row) {
        this.statee = true;
        console.log(row)
        console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该标题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.fullscreenLoading = true;
          this.$http({
            url: '/api/classify',
            method: 'DELETE',
            data: `pk=${row.id}`,
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
              this.rerenderTableData();
            }else {
              this.$message.error(response.msg)
            }
          });
        }).catch(() => {
          this.fullscreenLoading = false;
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    showAdd() {
      this.state = true;
    },
    cancle() {
      this.state = false;
    },
    success() {
      this.rerenderTableData();
    },
    },
}
</script>

<style scoped>
.title_header {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
}
</style>