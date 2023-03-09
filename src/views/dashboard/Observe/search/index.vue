<template>
  <el-card>
    <div class="header">
      <span>线上热门搜索</span>

      <el-dropdown>
        <span>
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-row :gutter="15">
        <el-col :span="12"> <lineCharts></lineCharts></el-col>
        <el-col :span="12"> <lineCharts></lineCharts></el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="排名" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column
          label="搜索关键字"
          width="180"
          prop="key"
          align="center"
        >
        </el-table-column>
        <el-table-column sortable label="用户数" prop="Number" align="center">
        </el-table-column>
        <el-table-column
          sortable
          label="周涨弧"
          prop="proportion"
          align="center"
        >
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- @size-change="handleSizeChange" -->
      <!-- @current-change="handleCurrentChange" -->
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        align="center"
        layout="prev, pager, next"
        :total="400"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  data() {
    return {
      tableData: [
        {
          key: "java",
          Number: 100000,
          proportion: "15%",
        },
        {
          key: "javascript",
          Number: 10000,
          proportion: "5%",
        },
        {
          key: "javascript",
          Number: 10000,
          proportion: "5%",
        },
      ],
    };
  },
  components: {
    lineCharts,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 30px;
  border-bottom: 1px solid rgba(230, 230, 230, 0.3);
}
</style>