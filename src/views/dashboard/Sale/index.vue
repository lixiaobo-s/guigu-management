<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!-- 左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
        <el-tab-pane label="访问量" name="vist"></el-tab-pane>
      </el-tabs>
      <!-- 右侧内容 -->
      <div class="right">
        <span @click="collectDay">今日</span>
        <span @click="collectweek">本周</span>
        <span @click="collecMonth">本月</span>
        <span @click="collecyear">本年</span>

        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          v-model="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <Mymain :title="title"></Mymain>
  </el-card>
</template>

<script>
import Mymain from "./Mymain";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "sale",
      // 收集时间
      date: [],
    };
  },
  components: {
    Mymain,
  },
  computed: {
    title() {
      return this.activeName == "sale" ? "销售额" : "访问量";
    },
    ...mapState({
      listState: (state) => state.home.datas,
    }),
  },
  methods: {
    collectDay() {
      let day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    collectweek() {
      let day1 = dayjs().day(6).format("YYYY-MM-DD");
      let day2 = dayjs().day(0).format("YYYY-MM-DD");
      this.date = [day2, day1];
    },
    collecMonth() {
      let day1 = dayjs().startOf("month").format("YYYY-MM-DD");
      let day2 = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [day1, day2];
    },
    collecyear() {
      let day1 = dayjs().startOf("year").format("YYYY-MM-DD");
      let day2 = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [day1, day2];
    },
  },
};
</script>

<style>
.el-card__header {
  border: none;
}
.clearfix {
  display: flex;
  position: relative;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.right span {
  margin-right: 20px;
}
</style>