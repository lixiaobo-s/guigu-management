<template>
  <div>
    <!-- 表格 -->
    <el-table
      style="width: 100%"
      border
      :data="SkuList"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
      <el-table-column label="序号" type="index" width="180" align="center">
      </el-table-column>
      <el-table-column label="名称" width="width" align="center" prop="skuName">
      </el-table-column>
      <el-table-column label="描述" width="width" align="center" prop="skuDesc">
      </el-table-column>
      <el-table-column label="图片" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <img
            v-lazy="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="width" align="center" prop="weight">
      </el-table-column>
      <el-table-column label="价格" width="width" align="center" prop="price">
      </el-table-column>
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            plain
            icon="el-icon-bottom"
            size="mini"
            v-if="row.isSale == 1"
            @click="Sale(row)"
            title="下架"
          ></el-button>
          <el-button
            icon="el-icon-top"
            type="success"
            size="mini"
            @click="UnSale(row)"
            title="下架"
            v-else
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            title="编辑"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            style="margin-right: 10px"
            title="详情"
            @click="skuinfodes(row.id)"
          ></el-button>
          <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="skuDelete(row)"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 抽屉展示详情 -->
    <el-drawer
      :visible.sync="isshow"
      :show-close="false"
      size="50%"
      class="el-col"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDesc.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuDesc.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDesc.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              class="left"
              type="success"
              v-for="item in skuDesc.skuAttrValueList"
              :key="item.id"
              >{{ item.valueId }}----{{ item.valueName }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" style="line-height: 300px">商品图片</el-col>
        <el-col :span="16">
          <template>
            <el-carousel :interval="4000" type="card" height="300px">
              <el-carousel-item
                v-for="item in skuDesc.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  style="width: 300px; height: 300px; border: 1px solid gray"
                />
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 初始化请求数据
      page: 1,
      limit: 3,
      total: 0,
      //接收sku列表
      SkuList: [],
      loading: true,
      // 存储详情
      skuDesc: {},
      // 抽屉展示的标识
      isshow: false,
    };
  },
  mounted() {
    //挂载成功后获取数据
    this.getList();
  },
  methods: {
    // 获取列表
    async getList() {
      this.loading = true;
      let result = await this.$API.sku.reqSkuList(this.page, this.limit);
      if (result.code == 200) {
        this.SkuList = result.data.records;
        this.total = result.data.total;
      }
      this.loading = false;
    },
    // 修改展示条数
    handleSizeChange(limit) {
      this.limit = limit;
      this.getList();
    },
    // 修改页数
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    },
    // 删除
    async skuDelete(row) {
      let result = await this.$API.sku.reqDeleteSkuById(row.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功！",
        });
      } else {
        this.$message.error("删除失败");
      }
      this.getList();
    },
    // 上架=>下架
    async Sale(row) {
      let result = await this.$API.sku.reqUnSale(row.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "商品已下架！",
        });
      }
      this.getList();
    },
    //下架=>上架
    async UnSale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "商品已上架！",
        });
      }
      this.getList();
    },
    // 获取详情
    async skuinfodes(skuid) {
      let result = await this.$API.sku.reqskuDesc(skuid);
      console.log(result);
      if (result.code == 200) {
        this.skuDesc = result.data;
      }
      // 控制抽屉展示
      this.isshow = true;
    },
  },
};
</script>

<style scoped>
/* 设置抽屉的字体样式 */
.el-col {
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
}
.el-row {
  margin: 50px 0;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.left {
  margin-left: 20px;
}
</style>