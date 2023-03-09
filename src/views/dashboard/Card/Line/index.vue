<template>
  <div class="charts" ref="linechart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Linecharts",
  mounted() {
    // 初始化echarts实列
    let lincharts = echarts.init(this.$refs.linechart);
    lincharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },

      series: [
        {
          type: "line",
          data: [0, 5, 3, 9],
          //设置线体平滑
          smooth: true,
          //   节点拐点
          itemStyle: {
            opacity: 0,
          },
          //线条颜色
          lineStyle: {
            color: "purple",
          },
          width: 2,
          shadowOffsetY: 12,
          shadowColor: "skyblue",
          //区域样式
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              //   设置渐变颜色
              colorStops: [
                {
                  offset: 0,
                  color: "skyblue",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
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