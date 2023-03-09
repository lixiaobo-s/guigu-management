<template>
  <!-- 内容区 -->
  <el-row :gutter="10">
    <el-col :span="17">
      <div class="mcharts" ref="salecharts"></div>
    </el-col>
    <el-col :span="7" class="col">
      <h4>门店{{ title }}额排名</h4>
      <ul>
        <li>
          <!-- //序号 -->
          <div>
            <span class="index">1</span>
            <span>肯德基</span>
          </div>
          <span class="number">12154</span>
        </li>
        <li>
          <div>
            <span class="index">2</span>
            <span>肯德基</span>
          </div>
          <span class="number">12154</span>
        </li>
        <li>
          <div>
            <span class="index">3</span>
            <span>肯德基</span>
          </div>
          <span class="number">12154</span>
        </li>
        <li>
          <div>
            <span class="index">4</span>
            <span>肯德基</span>
          </div>
          <span class="number">12154</span>
        </li>
        <li>
          <div>
            <span class="index">5</span>
            <span>肯德基</span>
          </div>
          <span class="number">12154</span>
        </li>
        <li>
          <div>
            <span class="index">6</span>
            <span>肯德基</span>
          </div>
          <span class="number">12154</span>
        </li>
        <li>
          <div>
            <span class="index">7</span>
            <span>肯德基</span>
          </div>
          <span class="number">12154</span>
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import echarts from "echarts";
import { mapState } from "vuex";
export default {
  props: ["title"],
  data() {
    return {
      salebar: null,
      // 数据
      datas: [],
    };
  },
  computed: {
    ...mapState({
      listState: (state) => state.home.datas,
    }),
  },
  mounted() {
    this.salebar = echarts.init(this.$refs.salecharts);
    this.salebar.setOption({
      title: {
        text: this.title + "趋势",
        left: "center",
      },
      xAxis: {
        type: "category",
        // data: [
        //   "一月",
        //   "二月",
        //   "三月",
        //   "四月",
        //   "五月",
        //   "六月",
        //   "七月",
        //   "八月",
        //   "九月",
        //   "十月",
        //   "十一月",
        //   "十二月",
        // ],
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: { show: false },
      },

      series: [
        {
          type: "bar",
          showBackground: true,
          color: "rgb(157,200,137)",
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
      // 提示组件
      tooltip: {
        // trigger: "item",
        backgroundColor: "rgba(135,206,235,0.9)", //设置背景颜色
        textStyle: {
          color: "purple", //设置文字颜色
        },
      },
    });
  },
  watch: {
    title() {
      this.salebar.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis: {
          type: "category",
          data:
            this.title == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            data:
              this.title == "销售额"
                ? this.listState.userFullYear
                : this.listState.orderFullYear,
            type: "bar",
            showBackground: true,
            color: "rgb(157,200,137)",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    },
    listState() {
      this.salebar.setOption({
        title: {
          text: this.title + "趋势",
        },
        xAxis: {
          type: "category",
          data:
            this.title == "销售额"
              ? this.listState.orderFullYearAxis
              : this.listState.userFullYearAxis,
        },
        series: [
          {
            data:
              this.title == "销售额"
                ? this.listState.userFullYear
                : this.listState.orderFullYear,
            type: "bar",
            showBackground: true,
            color: "rgb(157,200,137)",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    },
  },
};
</script>

<style>
.mcharts {
  margin-top: 50px;
  width: 100%;
  height: 250px;
}
.col ul {
  height: 200px;
  width: 100%;
  list-style: none;
  margin-left: -20px;
}
.col ul li {
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  color: cornflowerblue;
  margin-bottom: 10px;
}
.col ul li span.index {
  text-align: center;
  display: inline-block;
  width: 25px;
  background-color: orange;
  color: aliceblue;
  line-height: 25px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>