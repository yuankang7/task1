<template>
    <div>
        <div class="mainn" ref="main"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
export default {
    data() {
        return {

        }
    },
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.main);
        console.log(this.$refs.main)
        var option = {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            series: [
                {
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [50, 150],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 5890, name: '新增用户' },
                        { value: 6289, name: '登录数据' },
                        { value: 4789, name: '新增会员' },
                        { value: 6289, name: '视频播放量' },
                        { value: 3167, name: '支付宝订单' },
                        { value: 2893, name: '微信订单' },
                        { value: 6120, name: '视频转载' },
                        { value: 6200, name: '评分' }
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
</script>

<style scoped>

.mainn {
    width: 500px;
    height: 500px;
    background-color: #fff;
}

</style>