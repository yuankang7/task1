<template>
  <div class="modelhtml">
      <header class="model_header">
        <div class="multiple_choice"><span>当前一级标题：</span>
        <el-select v-model="titleid" placeholder="请选择" @change="changeid" >
          <el-option v-for="item in tableDate" :key="item.id" :label="item.name" :value="item.id" >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
          </el-option>
        </el-select>
      </div>
      <el-button class="addbtn" type="primary" @click="showAdd">新增标题</el-button>
    </header>
    <Add :titleid="titleid"  :state="state" @cancel="cancel" @success="success">
    </Add>
    <el-table
  :data="modelData"
  style="width: 100%"
  :default-sort = "{prop: 'date', order: 'descending'}"
  >
  <el-table-column
    prop="id"
    label="编号"
    sortable>
  </el-table-column>
  <el-table-column
    prop="name"
    label="模块"
    sortable>
  </el-table-column>
  <el-table-column
    prop="classify_id"
    label="分类编号"
    sortable>
  </el-table-column>
  <el-table-column
    prop="create_time"
    label="创建时间"
    sortable>
  </el-table-column>
  <el-table-column
    prop="update_time"
    label="更新日期"
    sortable>
  </el-table-column>
  <el-table-column
    label="操作">
    <template #default="scope">
      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">编辑</el-button>
      <el-dialog title="" :visible.sync="dialogFormVisible">
        <el-form :model="form" id="okk">
          <el-form-item label="编号：" :label-width="formLabelWidth">
            <el-form-item v-model="form.id" autocomplete="off">{{form.id}}</el-form-item>
          </el-form-item>
          <el-form-item label="章节：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="upcancel">取 消</el-button>
          <el-button type="primary" @click="updateok(scope.$index,scope.row)">确 定</el-button>
        </div>
      </el-dialog>
    
    <el-button
      style="margin-left: 10px"
        size="mini"
        type="danger"
        @click="handleDelete(scope.$index, scope.row)" v-loading.fullscreen.lock="fullscreenLoading">删除</el-button>
    </template>
  </el-table-column>
</el-table>
  </div>
</template>
<script>
import Add from './Add.vue'
export default {
components:{
  Add,
},
  data(){
      return{
          modelData:[{
              id:'12',
              name:'',
              classify_id:'61',
              course_id:'',
              update_time:'',
          }],
          fullscreenLoading: false,
          titleid:33,
          tableDate:[],
          value: '',
          state:false,
          form: {
          id:'',
          name: '',
          delivery: false,
          type: [],
        },
        formLabelWidth: '100px',
        fullscreenLoading: false,
        upindex: 0,
        dialogFormVisible: false,
      }
  },

  created(){
      this.rerenderModelData();
      this.rerenderTableData();
  },
  methods: {
    changeid(val){
      this.titleid=val
      this.rerenderModelData();
    },
    rerenderTableData(){
      this.$http({
          url:"/api/classify"
      }).then(res => {
          let response = res.data;
          if(response.status == 'success'){
              this.tableDate = response.data;
          }else{
              this.$message.error(response.msg);
          }
      })
    },
    rerenderModelData(){
      this.$http({
          url:`/api/course?pk=${this.titleid}`,
          method: "GET",
      }).then(res => {
          let response = res.data;
          if(response.status == 'success'){
            console.log(response)
              response.data.forEach(item => {

                  item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
                  item.update_time = new Date(item.update_time).toLocaleString();
              })
              this.modelData = response.data;
              console.log(response);
          }else{
              this.$message.error(response.msg);
          }
      })
    },
    handleEdit(index,row) {
      // this.upstate = true;
      this.dialogFormVisible = true
      this.upindex=index;
      let newtable = this.modelData[index];
      this.form.name = newtable.name;
      this.form.id = newtable.id;
    },
    updateok(index,row){
      console.log(this.form.name)
      this.$confirm('确认修改文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'denger'
      }).then(() => {
        this.fullscreenLoading = true;
        this.$http({
          url: "/api/course",
          method: "PUT",
          data: `pk=${this.form.id}&name=${this.form.name}`,
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          }
        }).then(res => {
          this.fullscreenLoading = false;
          let response = res.data;
          if (response.status == 'success') {
            this.$message({
              type: "success",
              message: "修改成功!!",
            });
            this.rerenderModelData();
          } else {
            this.$message.error(response.msg);
          }
        }).catch(error => {
          this.$message.error('接口错误');
        })
      }).catch(() => {
          this.fullscreenLoading = false;
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      this.dialogFormVisible = false;
    },
    upcancel(){
      this.dialogFormVisible = false;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'denger'
      }).then(() => {
        this.fullscreenLoading = true;
        this.$http({
          url: "/api/course",
          method: "DELETE",
          data: `pk=${row.id}`,
          headers: {
            'Content-Type': "application/x-www-form-urlencoded"
          }
        }).then(res => {
          console.log(res)
          this.fullscreenLoading = false;
          let response = res.data;
          if (response.status == 'success') {
            this.$message({
              type: "success",
              message: "删除成功！"
            });
            this.rerenderModelData();
          } else {
            this.$message.error(response.msg);
          }
        })
      }).catch(() => {
        this.fullscreenLoading = false;
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    showAdd(){
      this.state = true;
    },
    cancel() {
      this.state = false;
      this.dialogFormVisible = false;
    },
    success() {
      this.rerenderModelData();
    }
  }
}
</script>
<style scoped>
.model_header{
background-color: #fff;
margin-bottom: 10px;
padding: 10px;
display: flex;
justify-content: space-between;
}
.multiple_choice{
color: #909399;
font-weight: 600;
font-size: 15px;
}</style>
<style>
.modelhtml .el-dialog {
  width: 500px;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%,-50%) !important;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  padding-top: 40px;
  box-shadow: none !important;
  margin-top: 0vh !important;
}
.modelhtml .el-dialog__header{
padding: 0px;
}
.modelhtml .el-dialog__body{
padding-bottom: 10px !important;
}</style>