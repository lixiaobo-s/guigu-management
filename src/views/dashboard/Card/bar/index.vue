<template>
  <div ref="bar" class="charts"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "bar",
  data() {
    return {};
  },
  mounted() {
    let barcharts = echarts.init(this.$refs.bar);
    barcharts.setOption({
      xAxis: {
        show: false,
        data: ["1", "2", "3", "4", "5", "6"],
      },
      yAxis: {
        show: false,
      },
      // 提示组件
      tooltip: {
        // trigger: "item",
        backgroundColor: "rgba(255,255,0,0.3)", //设置背景图片 rgba格式
        textStyle: {
          color: "purple", //设置文字颜色
        },
      },

      series: [
        {
          type: "bar",
          data: [10, 7, 9, 3, 13, 2],
          color: "skyblue",
        },
      ],
      //   布局调试
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 10,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>