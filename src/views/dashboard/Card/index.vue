<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <Detail title="总销售额" count="￥12650">
            <template slot="charts">
              <div class="chart">
                <div class="chart-svg">
                  <span>周同比 &nbsp;&nbsp;56.67% </span>
                  <svg
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
                </div>
                <div class="chart-svg">
                  <span>日同比 &nbsp;&nbsp;19.96 </span>
                  <svg
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
                </div>
              </div>
            </template>
            <template slot="footer">
              <span>日销售额￥ 123</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <Detail title="访问量" count="88460">
            <template slot="footer">
              <span>日访问量 123</span>
            </template>

            <template slot="charts">
              <Linecharts></Linecharts>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card class="box-card">
          <Detail title="支付笔数" count="120">
            <template slot="footer">
              <span>转换率 64%</span>
            </template>
            <template slot="charts">
              <barcharts> </barcharts>
            </template>
          </Detail> </el-card
      ></el-col>
      <el-col :span="6"
        ><el-card class="box-card">
          <Detail title="运营活动效果" count="78%">
            <template slot="charts"> <Myprogress></Myprogress> </template>
            <template slot="footer">
              <div class="chart">
                <div class="chart-svg reheight">
                  <span>周同比 &nbsp;&nbsp;56.67% </span>
                  <svg
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
                </div>
                <div class="chart-svg reheight">
                  <span>日同比 &nbsp;&nbsp;19.96 </span>
                  <svg
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
                </div>
              </div>
            </template>
          </Detail> </el-card
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import Linecharts from "./Line";
import barcharts from "./bar";
import Myprogress from "./Myprogress";
export default {
  name: "Card",
  data() {
    return {};
  },
  components: {
    Detail,
    Linecharts,
    barcharts,
    Myprogress,
  },
};
</script>

<style>
.chart {
  display: flex;
}
.chart-svg {
  display: flex;
  align-content: center;
  margin-right: 10px;
}
.chart-svg span {
  line-height: 30px;
}
.reheight {
  margin-top: -7px;
  margin-bottom: -7px;
}
</style>