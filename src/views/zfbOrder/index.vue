<template>
  <div>
    <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column prop="id" label="编号" width="50">
            </el-table-column>
            <el-table-column prop="vip" label="商品名" width="100">
            </el-table-column>
            <el-table-column prop="qs_trade_no" label="訂單號" width="250">
            </el-table-column>
            <el-table-column prop="pay_state" label="支付状态" width="200">
            </el-table-column>
            <el-table-column prop="total_amount" label="价格" width="100">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="250">
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间" width="250">
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData:[]
    }
  },
  created(){
    this.reZfb();
  },
  methods:{
    reZfb(){
      this.$http({
        url:"api/alipay_order_query"
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