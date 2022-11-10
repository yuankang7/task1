<template>
    <div class="manager bx">
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
            <!-- 插槽 -->
            <el-table-column prop="avator" label="头像" width="50">
                <template #default="{ row }">
                    <el-avatar :src="url + row.avator"></el-avatar>
                </template>
            </el-table-column>

            <el-table-column prop="create_time" label="创建时间" width="200">
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间" width="200">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <!-- 插槽 -->
                <template #default="{ row }">
                    <el-button size="mini" type="danger" @click="Delete(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

import { url } from '@/axios'
export default {
    data() {
        return {
            list: [],
            url
        }
    },
    created() {
        this.render();
        // console.log(this.list);
    },
    methods: {
        // 渲染函数
        render() {
            this.$http({
                url: 'api/superusers',
            }).then(response => {
                let res = response.data;
                // console.log(res)
                if (res.status == 'error') {
                    this.$message.error(res.msg)
                } else {
                    res.data.forEach(item => {
                        item.create_time = new Date(item.create_time).toLocaleString();
                        item.update_time = new Date(item.update_time).toLocaleString();
                    })
                    this.list = res.data;
                }
            })
        },
        formatter(row, column, cellValue, index) {
            if (cellValue == 1) {
                return '男'
            } else {
                return '女'
            }
        },
        Delete(pk) {
            this.$http({
                url: 'api/removesuperuser',
                method: 'DELETE',
                data: `pk=${pk}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(response => {
                let res = response.data;
                if (res.status == 'erros') {
                    this.$message.error(res.msg)
                } else {
                    this.$message({
                        type: 'success',
                        message: res.msg
                    })
                    this.render();
                }
            })
        }
    }
}
</script>

<style>

</style>