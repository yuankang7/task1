<template>
    <div class="orderhtml">
    <el-table class="orderform"
    max-height="250"
    :data="zfbData" 
            style="width: 100%" 
            :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="id" label="编号" sortable width="120px"></el-table-column>
            <el-table-column prop="user" label="用户名" sortable width="120px">尤度度</el-table-column>
            <el-table-column prop="vip" label="交易商品" sortable></el-table-column>
            <el-table-column prop="qs_trade_no" label="交易订单" sortable width="230px"></el-table-column>
            <el-table-column prop="total_amount" label="交易金额" sortable ></el-table-column>
            <el-table-column prop="pay_state" label="交易状态" sortable :formatter="paystate"></el-table-column>
            <!-- <el-table-column label="操作" width="190px">
            <template #default="scope">
                <el-button size="mini" type="primary" plain @click="renew(scope.$index, scope.row)">刷新订单</el-button>
            </template>
            </el-table-column> -->
    </el-table>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
            zfbData: [],
            state: false,
            fullscreenLoading: false,
        }
      },
      created() {
        this.getList();
    },
    methods: {
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // this.page=this.$refs.lala.internalCurrentPage
        this.page = val;
        this.getList()
      },
        getList() {
            let pages=this.page;
            this.$http({
                method: "GET",
                url: `/api/alipay_order_query?page=1`,
            }).then(res => {
                console.log(res);
                let response = res.data;
                if (response.status == 'success') {
                    response.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();//转换为年月日
                    })
                    this.zfbData = response.data;
                    this.total =(response.count)*10
                } else {
                    this.$message.error(response.msg);
                }
            })
        },
        paystate(row, column, cellValue, index) {
            if (cellValue == 'TRADE_CREATE' ) {
                return "商家订单创建，等待创建支付宝订单"
            } else if(cellValue == 'WAIT_BUYER_PAY'  ){
                return "交易创建，等待买家付款"
            } else if(cellValue == 'TRADE_CLOSED'    ){
                return "未付款交易超时关闭，或支付完成后全额退款"
            } else if(cellValue == 'TRADE_SUCCESS'  ){
                return "交易支付成功"
            } else if(cellValue == 'TRADE_FINISHED'  ){
                return "交易结束，不可退款"
            }
        },
        renew(index,row){
            let trade_no = this.zfbData[index].qs_trade_no
            let formData = new FormData();
            formData.append('trade_no',trade_no)
            this.$http({
                url:"http://81.68.121.52:8000/api/alipay_order_update",
                method:"POST",
                data:formData
            }).then(res => {
                let response = res.data;
                if(response.status == 'success'){
                    this.$message({
                        type: 'success',
                        message: "更新成功！"
                    })
                }else{
                    this.$message.error(response.msg)
                }
            })
        }
    },
};

</script>
  <style scoped>
  .orderhtml{
    padding: 20px;
    background-color: #fff;
    margin-top: 20px;
  }
</style>