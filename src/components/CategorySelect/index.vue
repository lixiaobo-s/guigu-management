<template>
  <div>
    <!-- //行内表单 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.Category1Id"
          @change="hanlder1"
          :disabled="disable"
        >
          <el-option
            v-for="Category1t in Category1List"
            :label="Category1t.name"
            :key="Category1t.id"
            :value="Category1t.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.Category2Id"
          @change="hanlder2"
          :disabled="disable"
        >
          <el-option
            :label="Category2t.name"
            v-for="Category2t in Category2List"
            :key="Category2t.id"
            :value="Category2t.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.Category3Id"
          @change="hanlder3"
          :disabled="disable"
        >
          <el-option
            :label="Category3t.name"
            v-for="Category3t in Category3List"
            :key="Category3t.id"
            :value="Category3t.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      Category1List: [],
      Category2List: [],
      Category3List: [],
      // 收集各级的id
      cForm: {
        Category1Id: "",
        Category2Id: "",
        Category3Id: "",
        level: "",
      },
      disable: false,
    };
  },
  mounted() {
    //获取一级分类
    this.getCategory1List();
    //更改三级分类状态
    this.$bus.$on("isdisable", (i) => {
      this.disable = i;
    });
  },
  methods: {
    async getCategory1List() {
      let result = await this.$API.attr.reqGetOne();
      if (result.code == 200) {
        this.Category1List = result.data;
      }
    },
    // 一级分类内容方式变化
    async hanlder1() {
      const { Category1Id } = this.cForm;
      let result = await this.$API.attr.reqGetTwo(Category1Id);
      this.Category2List = [];
      this.cForm.Category2Id = "";
      this.Category3List = [];
      this.cForm.Category3Id = "";
      if (result.code == 200) {
        this.cForm.level = 1;
        this.Category2List = result.data;
      }
    },
    // 二级分类内容变化
    async hanlder2() {
      const { Category2Id } = this.cForm;
      let result = await this.$API.attr.reqGetTwo(Category2Id);
      this.Category3List = [];
      this.cForm.Category3Id = "";
      if (result.code == 200) {
        this.cForm.level = 2;
        this.Category3List = result.data;
      }
    },
    // 获取3级数据
    async hanlder3() {
      this.cForm.level = 3;
      this.$emit("getCategroy", this.cForm);
    },
  },
};
</script>

<style>
</style>