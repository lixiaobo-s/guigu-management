<template>
  <div>
    <el-card style="margin-top: 10px">
      <CategorySelect @getCategroy="getCategroy" />
    </el-card>
    <el-card style="margin-top: 20px">
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!CategroyIds.Category3Id"
          @click="addCategroyList"
          >添加属性</el-button
        >
        <el-table
          style="width: 70%; margin-top: 15px"
          border
          :data="CategroyList"
        >
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值列表" prop="" width="width">
            <template slot-scope="{ row, index }">
              <el-tag
                type="success"
                v-for="avl in row.attrValueList"
                :key="avl.id"
                >{{ avl.valueName }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column label="操作" prop="" width="250" align="center">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateCategroy(row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deletCatory(row, $index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- //添加修改展示的窗口 -->
      <div v-show="!isShowTable" style="text-align: center">
        <el-form :inline="true" ref="form" label-width="80px" :model="Categroy">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="Categroy.attrName"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue"
            :disabled="!Categroy.attrName"
            >添加</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-form>

        <el-table
          style="width: 70%; margin: 20px auto"
          border
          :data="Categroy.attrValueList"
        >
          <el-table-column label="序号" align="center" type="index" width="100">
          </el-table-column>
          <el-table-column label="属性值名称" align="center" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="输入属性值名称"
                v-if="row.blurs"
                @blur="isblur(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="inblur(row, $index)"
                style="display: inline-block; width: 100%"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteitem(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveCategroy"
          :disabled="Categroy.attrValueList.length == 0"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      //商品列表
      CategroyList: [],
      //ids
      CategroyIds: {
        Category1Id: "",
        Category2Id: "",
        Category3Id: "",
      },
      isShowTable: true,
      // 收集属性值
      Categroy: {
        attrName: "", //属性名
        attrValueList: [],
        categoryId: "", //三级分类id
        categoryLevel: 3, //区分id
      },
    };
  },
  methods: {
    // 自定义事件
    async getCategroy(ids) {
      let { Category1Id, Category2Id, Category3Id } = ids;
      this.CategroyIds.Category1Id = Category1Id;
      this.CategroyIds.Category2Id = Category2Id;
      this.CategroyIds.Category3Id = Category3Id;
      if (this.CategroyIds.Category3Id) {
        let result = await this.$API.attr.reqList(ids);
        this.$bus.$emit("isdisable", false);
        if (result.code == 200) {
          this.CategroyList = result.data;
        }
      }
    },
    // 添加属性按钮
    addCategroyList() {
      this.isShowTable = false;
      this.Categroy.attrName = "";
      this.Categroy.attrValueList = [];
      this.Categroy.categoryId = this.CategroyIds.Category3Id;
      this.Categroy.categoryLevel = 3;
      // 发送三级菜单是否隐藏
      this.$bus.$emit("isdisable", true);
    },
    // 修改
    updateCategroy(row) {
      this.isShowTable = false;
      //深拷贝
      this.Categroy = cloneDeep(row);
    },
    // 添加属性值
    addAttrValue() {
      if (this.isnull()) {
        // 当有数据时候判断
        if (this.Categroy.attrValueList.length != 0) {
          return;
        }
      }
      let obj = {};
      // 添加属性没有id
      obj.attrId = this.Categroy.id;
      obj.valueName = "";
      obj.blurs = true;
      this.Categroy.attrValueList.push(obj);

      this.$nextTick(() => {
        this.$refs[this.Categroy.attrValueList.length - 1].focus();
      });
    },
    isblur(row) {
      if (row.valueName.trim() == "") {
        this.$message.error("输入内容不能为空！");
        return;
      }
      //去重
      let isrepat = this.Categroy.attrValueList.some((item) => {
        // 去除自己
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isrepat) {
        this.$message.error("不能输入重复内容");
        return;
      }
      this.Categroy.attrValueList.forEach((element) => {
        element.blurs = false;
      });
    },
    inblur(row, index) {
      // 先遍历全部，设置关闭
      this.Categroy.attrValueList.forEach((element) => {
        //$set 添加动态属性值 set（对象，对象名称，值）
        this.$set(element, "blurs", false);
      });
      row.blurs = true;
      // 重新渲染页面
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 判断是否有为空的情况
    isnull() {
      const { attrValueList } = this.Categroy;
      //判断是否存在未输入的情况，进行删除
      let result = attrValueList.some((item) => {
        if (item.valueName == "") {
          this.$message({
            message: "输入再进行删除",
            type: "warning",
          });
        }
        return item.valueName == "";
      });
      if (result) {
        return true;
      }
      return false;
    },
    // 新增里面删除
    deleteitem(row) {
      const { attrValueList } = this.Categroy;
      //返回
      if (this.isnull()) {
        return;
      }
      //删除
      this.$confirm("是否删除此条", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          attrValueList.some((item, i) => {
            if (item.valueName == row.valueName) {
              attrValueList.splice(i, 1);
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 保存
    async saveCategroy() {
      if (this.isnull()) {
        return;
      }
      // 移除blurs
      const { attrValueList } = this.Categroy;
      attrValueList.forEach((item) => {
        item.blurs = undefined;
      });
      let result = await this.$API.attr.addCategory(this.Categroy);
      if (result.code == 200) {
        //提示
        this.$message({
          type: "success",
          message: "保存成功!",
        });
        //返回页面
        setTimeout(async () => {
          this.isShowTable = true;
          // 重新刷新页面
          this.getCategroy(this.CategroyIds);
        }, 1000);
      }
    },
    //取消
    cancel() {
      this.isShowTable = true;
      this.$bus.$emit("isdisable", false);
    },
    //删除
    deletCatory(attrId, index) {
      let id = attrId.id;
      this.$confirm("是否删除此条", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //发送删除的请求
          let result = await this.$API.attr.deleteCategory(id);
          //判断是否成功
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            setTimeout(async () => {
              // 重新刷新页面
              this.getCategroy(this.CategroyIds);
            }, 500);
            return;
          }
          this.$message({
            type: "info",
            message: "删除失败!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>