<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <svg
        t="1668152311209"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2679"
        width="18"
        height="18"
      >
        <path
          d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
          p-id="2680"
          fill="#bfbfbf"
        ></path>
      </svg>
    </div>
    <div class="main">
      <p>
        <span>1232</span> <span>17.1</span>
        <svg
          v-if="up"
          t="1668153828466"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3305"
          width="30"
          height="30"
        >
          <path
            d="M512 405.333333L298.666667 618.666667h426.666666L512 405.333333z"
            fill="#d81e06"
            p-id="3306"
          ></path>
        </svg>
        <svg
          v-else
          t="1668154607547"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4389"
          width="32"
          height="32"
        >
          <path
            d="M512 618.666667L298.666667 405.333333h426.666666L512 618.666667z"
            fill="#1afa29"
            p-id="4390"
          ></path>
        </svg>
      </p>
      <div ref="line" class="line"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      up: false,
    };
  },
  mounted() {
    let line = echarts.init(this.$refs.line);
    line.setOption({
      title: {
        text: "",
      },
      xAxis: {
        type: "category",
      },
      smooth: true,
      itemStyle: {
        opacity: 0,
      },

      yAxis: {},
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
          areaStyle: {
            normal: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#dc3881", // 0% 处的颜色
                  },
                  {
                    offset: 0.2,
                    color: "rgba(220,56,129,0.1)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.header span {
  margin-right: 10px;
}
.main p {
  display: flex;
  align-items: center;
}
.main p span {
  margin-right: 10px;
  color: gray;
}
.main p span:nth-of-type(1) {
  font-size: 24px;
  margin-right: 60px;
  color: black;
}
.line {
  width: 100%;
  height: 300px;
}
</style>