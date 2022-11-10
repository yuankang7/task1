<template>
  <div>
    <el-table :data="list" style="width: 100%" class="table">
            <el-table-column prop="id" label="编号" width="50">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="100">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="200">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="gender" :formatter="formatter" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="200">
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间" width="200">
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>