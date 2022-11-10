<template>
  <div>
      <header>
          <div class="chapter_header">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="标题" prop="name">
                      <el-select v-model="formInline.region" placeholder="课程名称">
                          <el-option v-for ="item in titleData" :label="item.name" :value="item.id"> </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="onSubmit">查询</el-button>
                  </el-form-item>
              </el-form>
          </div>
          <el-button type="primary" @click="showAdd" class="showAdd">新增</el-button>
      </header>
      <Add :state="state" @cancle="cancle" :getpkname="getpkname"></Add>
      <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
          <el-table-column prop="id" label="编号" sortable width="180">
          </el-table-column>
          <el-table-column prop="name" label="名称" sortable width="180">
          </el-table-column>
          <el-table-column prop="classify_id" sortable label="类别编号">
          </el-table-column>
          <el-table-column prop="course_id" sortable label="课程编号">
          </el-table-column>
          <el-table-column prop="create_time" sortable label="创建日期">
          </el-table-column>
          <el-table-column prop="update_time" sortable label="更新日期">
          </el-table-column>
          <el-table-column label="操作">
              <template #default="scope">
                  <el-button size="mini">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
              </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import Add from './Add.vue'
export default {
  // name: 'Chapter',
  components: {
      Add
  },
  data() {
      return {
          tableData: [],
          formInline: {
              user: '',
              region: ''
          },
          titleData: [],
          fullscreenLoading: false,
          state: false,
          getpkname: ''
      }
  },
  created() {
      this.gettitle();
  },
  methods: {
      // 渲染函数
      getChapter() {
          this.$http({
              url: `api/chapter?pk=${this.formInline.region}`,
          }).then(res => {
              if (res.data.status == 'success') {
                  this.tableData = res.data.data;
                  // console.log(this.tableData);
              } else {
                  this.$message.error(res.data.msg)
              }
          })
      },
      gettitle() {
          this.$http({
              url: 'api/classify'
          }).then(res => {
              this.titleData = res.data.data;
              // console.log(res)
          }).catch(error => {

          })
      },
      onSubmit() {
          console.log(typeof this.formInline.region)
          this.getChapter();
      },
      showAdd() {
          this.getpkname = this.formInline.region.toString();
          this.state = true
      },
      cancle() {
          this.state = false
      },
      handleDelete(){
          
      }
  }
}

</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
}

.showAdd {
  height: 40px;
}
</style>