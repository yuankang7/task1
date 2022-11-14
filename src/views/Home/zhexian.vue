<template>
    <div>
        <div class="zhexian" ref="zhexian"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
    export default {
        mounted(){
            var chartDom = this.$refs.zhexian;
            var myChart = echarts.init(chartDom);
            var option;

        const colors = ['#5470C6', '#EE6666'];
            option = {
                color: colors,
                tooltip: {
                    trigger: 'none',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {},
                grid: {
                    top: 70,
                    bottom: 50
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return (
                                        '新增用户  ' +
                                        params.value +
                                        (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                                    );
                                }
                            }
                        },
                        // prettier-ignore
                        data: ['2022-1', '2022-2', '2022-3', '2022-4', '2022-5', '2022-6', '2022-7', '2022-8', '2022-9', '2022-10', '2022-11']
                    },
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisPointer: {
                            label: {
                                formatter: function (params) {
                                    return (
                                        '订单数量  ' +
                                        params.value +
                                        (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                                    );
                                }
                            }
                        },
                        // prettier-ignore
                        data: ['2022-1', '2022-2', '2022-3', '2022-4', '2022-5', '2022-6', '2022-7', '2022-8', '2022-9', '2022-10', '2022-11']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '订单数量',
                        type: 'line',
                        xAxisIndex: 1,
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            166, 189, 229, 226, 478, 549, 615, 652, 658, 718, 768, 829
                        ]
                    },
                    {
                        name: '新增用户',
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        data: [
                            259, 272, 331, 299, 348, 419, 531, 696, 745, 828, 880, 919
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);

        }

    }
</script>

<style scoped>
.zhexian{
    width: 715px;
    height: 500px;
    /* padding-top30px: ; */
    background-color: #fff;
}
</style>