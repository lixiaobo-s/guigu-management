<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-puls"
      style="margin: 10px 0px"
      @click="diaShow"
      >添加</el-button
    >
    <!-- 表格文档 -->
    <el-table style="with: 100%" border :data="trademarkList">
      <el-table-column
        label="序号"
        width="100px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌logo">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt=""
            srcset=""
            style="height: 100px; width: 100px"
          />
        </template>
        slot-scope="">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMake(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradmark(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :total="total"
      :current-page="page"
      :pager-count="5"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      @current-change="handlerChange"
      @size-change="hanldersChange"
      layout="prev,pager,next,jumper,->,sizes,total"
      style="margin-top: 20px; text-align: center"
    ></el-pagination>

    <!-- 对话框 -->
    <!--
  visible.sync:表单是否显示，

-->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 80%" :rules="rules" ref="rulesform">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="form.tmName"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/adm-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTradeMake">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "trademark",
  data() {
    return {
      // 设置当前页数
      page: 1,
      // 设置展示数
      limit: 3,
      // 设置总条数
      total: 0,
      // 品牌列表数据
      trademarkList: [],
      // 控制对话框显示
      dialogFormVisible: false,
      // 商品id
      tid: "",
      // 搜集表单信息
      form: {
        tmName: "",
        logoUrl: "",
      },
      //验证规则
      rules: {
        //验证品牌名称的规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        // 品牌logo的验证规则
        logoUrl: [{ required: true, message: "请选择图片" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  computed: {
    // 计算最后一页
    lastPage() {
      const { total, limit } = this;
      // 总条数除展示数
      let lastpage = total / limit;
      this.page = Math.floor(lastpage) + 1;
      this.getPageList();
    },
  },
  methods: {
    // 获取品牌列表方法
    async getPageList() {
      let result = await this.$API.trademark.reqTradeMarkList(
        this.page,
        this.limit
      );
      if (result.code == 200) {
        this.trademarkList = result.data.records;
        this.total = result.data.total;
      }
    },
    // 页码改变
    handlerChange(page) {
      this.page = page;
      this.getPageList();
    },
    // 展示条数改变
    hanldersChange(size) {
      this.limit = size;
      this.getPageList();
    },
    // 显示对话框
    diaShow() {
      this.dialogFormVisible = true;
      this.form.tmName = "";
      this.form.logoUrl = "";
      this.tid = "";
    },
    // 确定按钮事件
    addTradeMake() {
      this.$refs.rulesform.validate(async (success) => {
        if (success) {
          if (this.tid == "") {
            let result = await this.$API.trademark.updatedMark(this.form);
            if (result.code == 200) {
              this.$message({
                message: "添加品牌成功！",
                type: "success",
              });
              // 跳转到最后一页
              this.lastPage;
            }
          } else {
            let result = await this.$API.trademark.updatedMarkById(this.form);
            if (result.code == 200) {
              this.$message({
                message: "修改品牌成功！",
                type: "success",
              });
              this.getPageList();
            }
          }
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
    },
    // 修改某个品牌
    async updateTradeMake(row) {
      this.dialogFormVisible = true;
      this.form.logoUrl = row.logoUrl;
      this.form.tmName = row.tmName;
      // 储存商品id
      this.tid = row.id;
      this.form.id = row.id;
    },
    // 删除
    deleteTradmark(id) {
      let Tid = id;
      this.$confirm("确定删除词条商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.delateMarkById(Tid);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 当前页码最后一条数据删除后页码减少1，再重新加载页面
            if (this.trademarkList.length == 1) {
              this.page = this.page - 1;
            }
            this.getPageList();
          }
        })
        .catch(() => {});
    },
    // 上传图片部分
    handleAvatarSuccess(res, file) {
      // res: 上传成功后返回前端数据
      // file 上传成功后返回服务器返回的数据
      this.form.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>>
