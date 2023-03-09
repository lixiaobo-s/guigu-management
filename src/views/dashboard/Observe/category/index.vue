<template>
  <el-card>
    <div class="header">
      <span>销售额占比</span>
      <el-radio-group v-model="value">
        <el-radio-button :label="3">全部渠道</el-radio-button>
        <el-radio-button :label="6">线上</el-radio-button>
        <el-radio-button :label="9">门店</el-radio-button>
      </el-radio-group>
    </div>
    <div ref="pie" class="pie"></div>
  </el-card>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      value: "3",
    };
  },
  mounted() {
    let pie = echarts.init(this.$refs.pie);
    pie.setOption({
      title: {
        text: "Search Engine",
        subtext: "1048",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "0%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    //绑定事件
    pie.on("mouseover", (params) => {
      const { name, value } = params.data;
      pie.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid rgba(230, 230, 230, 0.3);
}
.pie {
  margin-top: 150px;
  height: 455px;
  width: 100%;
}
</style>