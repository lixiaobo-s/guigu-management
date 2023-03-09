<template>
  <div class="charts" ref="pro"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Myprogress",
  mounted() {
    let progress = echarts.init(this.$refs.pro);
    progress.setOption({
      xAxis: {
        show: false,
        // 最小值
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "rgba(26,250,41,0.3)",
          //柱状图宽度
          barWidth: "15",
          // 设置柱状图背景
          showBackground: true,
          backgroundStyle: {
            color: "rgba(128,128,128,0.1)",
          },
          //文本
          label: {
            show: true,
            //更改展示的内容，默认为数值
            formatter: "|",
            //设置展示的位置
            position: "right",
          },
        },
      ],
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