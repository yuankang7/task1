<template>
  <div class="homehtml">
      <viewModel></viewModel>
      <div class="top">
          <bingTu></bingTu>
          <!-- <zhu></zhu> -->
          <zhexian></zhexian>
      </div>
      <orderForm></orderForm>
  </div>
</template>

<script>
import xuanKu from './xuanKu.vue'
import zhu from './zhuzhang.vue'
import bingTu from './bingTu.vue'
import viewModel from './viewModel.vue'
import orderForm from './orderForm.vue'
import zhexian from './zhexian.vue'
import * as echarts from 'echarts'
export default {
  components:{
      zhu,
      bingTu,
      viewModel,
      orderForm,
      zhexian,
  },
  data() {
      return {

      }
  },

}
</script>

<style scoped>
.top{
  padding: 50px 0px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
</style>