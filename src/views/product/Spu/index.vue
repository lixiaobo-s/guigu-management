<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategroy="getCategroy" />
    </el-card>
    <el-card>
      <!-- 展示结构 -->
      <!-- 展示列表 -->
      <div v-show="exhibition == 'list'">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="showspuform('add')"
          >添加SPU</el-button
        >
        <el-table style="width: 100%; margin-top: 20px" border :data="records">
          <el-table-column type="index" label="序号" width="180" align="center">
          </el-table-column>
          <el-table-column
            label="Spu名称"
            width="width"
            align="center"
            prop="spuName"
          >
          </el-table-column>
          <el-table-column
            label="Spu描述"
            width="width"
            align="center"
            prop="description"
          >
          </el-table-column>
          <el-table-column label="操作" width="width" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="编辑"
                @click="showspuform('update', row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="sku列表"
                @click="IsShowskuList(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除"
                @click="deletespu(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          align="center"
          :current-page="page"
          :page-size="1"
          :total="total"
          :page-sizes="[3, 5, 10]"
          @current-change="pagechange"
          @size-change="sizechange"
          layout="prev,pager,next,jumper,->,sizes,total"
        ></el-pagination>
      </div>
      <!-- //修改spu -->
      <spuform
        v-show="exhibition == 'addspu'"
        @backt="backlist"
        ref="updatespu"
      ></spuform>
      <!-- 展示添加sku -->
      <skuform
        v-show="exhibition == 'addsku'"
        @backt="backlist"
        ref="addsku"
      ></skuform>
    </el-card>

    <!-- //dialog对话框 -->
    <el-dialog
      :title="`${skuinform.spuName}的列表`"
      :visible.sync="dialogTableVisible"
    >
      <el-table :data="gridData" border v-loading="loading">
        <el-table-column
          property="date"
          label="名称"
          width="150"
          align="center"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          property="name"
          label="价格"
          width="200"
          align="center"
          prop="price"
        ></el-table-column>
        <el-table-column
          property="name"
          label="重量"
          width="200"
          prop="weight"
          align="center"
        ></el-table-column>
        <el-table-column
          property="name"
          label="默认图片"
          width="width"
          align="center"
        >
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 200px; height: 200px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import skuform from "./skufrom";
import spuform from "./spuform";
export default {
  name: "spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 初始化页数和展示条数
      page: 1,
      limit: 3,
      // 存储spu列表
      records: [],
      //总条数
      total: 0,
      // 展示界面的标识
      exhibition: "list",
      // 展示sku列表的标识
      dialogTableVisible: false,
      skuinform: {},
      gridData: [],
      loading: true,
    };
  },
  components: {
    skuform,
    spuform,
  },
  methods: {
    //三级联动时间
    getCategroy(categoryId) {
      const { level } = categoryId;
      if (level == 1) {
        this.category1Id = categoryId.Category1Id;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId.Category2Id;
        this.category3Id = "";
      } else {
        this.category1Id = categoryId.Category1Id;
        this.category2Id = categoryId.Category2Id;
        this.category3Id = categoryId.Category3Id;
        this.getSpuList();
      }
    },
    //获取列表
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSupList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 页码数变化
    pagechange(page) {
      this.page = page;
      this.getSpuList();
    },
    //展示条数变化
    sizechange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    //展示新增修改界面
    showspuform(type, row) {
      this.exhibition = "addspu";
      if (type == "update") {
        //指定按钮类型
        this.$refs.updatespu.reqInfo("update", row);
      } else {
        // 新增携带3级id
        this.$refs.updatespu.reqInfo("add", this.category3Id);
      }
      this.$bus.$emit("isdisable", true);
    },
    showskuList() {
      this.exhibition = "addsku";
    },
    // 删除
    deletespu(row) {
      this.$confirm("是否删除此列?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.spu.deleteSpuById(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "info",
              message: "删除失败！",
            });
          }
          this.getSpuList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 自定义事件
    backlist(e) {
      this.exhibition = e;
      this.getSpuList();
    },
    // 添加sku
    addSku(row) {
      this.exhibition = "addsku";
      this.$bus.$emit("isdisable", true);
      let ids = {
        category1Id: this.category1Id,
        category2Id: this.category2Id,
        category3Id: this.category3Id,
      };
      this.$refs.addsku.addsku(row, ids);
    },
    // 展示diog对话框
    async IsShowskuList(row) {
      this.gridData = [];
      this.loading = true;
      this.dialogTableVisible = true;
      this.skuinform = row;
      let result = await this.$API.sku.reqSkuListById(row.id);
      if (result.code == 200) {
        this.gridData = result.data;
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>
