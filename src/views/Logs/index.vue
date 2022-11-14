<template>
  <div>
    <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column prop="id" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="100">
            </el-table-column>
            <el-table-column prop="ip" label="IP" width="150">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="200">
            </el-table-column>
        </el-table>
  </div>
</template>



<script>
export default {
  data(){
    return{
      tableData:[],
      page:'1'
    }
  },
  created(){
    this.reRz();
  },
  methods:{
    reRz(){
      this.$http({
        url:`api/supersigninlogs?page=${this.page}`,
      }).then(res=>{
        if(res.data.status=='error'){
          this.$message.error(res.data.msg);
        }else{
          let response = res.data;
          console.log(res)
          this.tableData = res.data.data
          response.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();
                        item.update_time = new Date(item.update_time).toLocaleString();
          })
        }
      })
    },
  }   
}
</script>

<style>

</style>