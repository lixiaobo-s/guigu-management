<template>
  <div>
    <el-form ref="form" label-width="80px" :data="spuinfo">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spuinfo.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuinfo.tmId">
          <el-option
            :label="tm.tmName"
            v-for="(tm, index) in tradeMark"
            :key="tm.id"
            :value="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="2"
          placeholder="描述"
          v-model="spuinfo.description"
        ></el-input>
      </el-form-item>

      <el-form-item lebel="上传">
        <el-upload
          action="/adm-api/admin/product/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuimg"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelect.length} 未选择`"
          v-model="attrId"
        >
          <el-option
            :label="select.name"
            v-for="(select, index) in unSelect"
            :value="`${select.id}:${select.name}`"
            :key="select.id"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" @click="addAttr"
          >添加销售属性</el-button
        >
      </el-form-item>

      <el-form-item>
        <el-table style="width: 100%" border :data="spuinfo.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column label="属性名" width="width" prop="saleAttrName">
          </el-table-column>
          <el-table-column label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="hanlderClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handlerInputCofirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addAttrValue(row)"
                >+ 添 加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAll(row, $index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="sendlist">保存</el-button>
        <el-button @click="backList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuform",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // spu信息·1属性
      spuinfo: {
        // 三级分类的id
        category3Id: 0,
        //描述
        description: "",
        // spu的名称
        spuName: "",
        //平台id
        tmId: 0,
        // 图片列表
        spuImageList: [],

        // 平台属性和属性值
        spuSaleAttrList: [],
      },
      // c初始化tradeMark
      tradeMark: [],
      // 初始化图片信息
      spuimg: [],
      // 平台销售属性
      saleResult: [],
      // 未选择的销售属性id
      attrId: "",
    };
  },
  computed: {
    //未选择的属性
    unSelect() {
      return this.saleResult.filter((item) => {
        return this.spuinfo.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
  methods: {
    //移除图片
    handleRemove(file, fileList) {
      this.spuimg = fileList;
    },
    // 添加图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //发送请求
    async reqInfo(type, row) {
      // 编辑按钮进入
      if (type == "add") {
        // 清空所有表单元素
        this.tradeMark = [];
        this.spuimg = [];
        this.saleResult = [];
        this.attrId = "";
        this.spuinfo = {
          // 三级分类的id
          category3Id: row,
          //描述
          description: "",
          // spu的名称
          spuName: "",
          //平台id
          tmId: undefined,
          // 图片列表
          spuImageList: [],

          // 平台属性和属性值
          spuSaleAttrList: [],
        };
      } else {
        // 获取spu信息
        let spuinfo = await this.$API.spu.reqSupInfobyId(row.id);
        if (spuinfo.code == 200) {
          this.spuinfo = spuinfo.data;
        }
        //获取图片
        let spuimg = await this.$API.spu.reqSpuImageList(row.id);
        if (spuimg.code == 200) {
          let imglist = spuimg.data;
          //处理数据
          imglist.forEach((element) => {
            element.name = element.imgName;
            element.url = element.imgUrl;
          });
          this.spuimg = imglist;
        }
      }
      // 获取品牌信息
      let tradeMark = await this.$API.spu.reqTradeMark();
      if (tradeMark.code == 200) {
        this.tradeMark = tradeMark.data;
      }
      //获取平台所有销售属性
      let saleResult = await this.$API.spu.reqAllSaleAttrList();
      if (saleResult.code == 200) {
        this.saleResult = saleResult.data;
      }
    },
    //图片上传成功后的回调
    handlerSuccess(res, file, fileList) {
      this.spuimg = fileList;
    },
    //添加新的销售属性
    addAttr() {
      // 分割attrid
      const [baseSaleAttrId, saleAttrName] = this.attrId.split(":");
      if (this.unSelect.length <= 0 || this.attrId == "") {
        return;
      }
      let obj = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spuinfo.spuSaleAttrList.push(obj);
      this.attrId = "";
    },
    // 添加按钮
    addAttrValue(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
    },
    // 失去焦点
    handlerInputCofirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空！");
        return;
      }
      let ins = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != inputValue;
      });
      if (!ins) {
        this.$message("属性值重复！");
        return;
      }
      let newAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newAttrValue);
      row.inputVisible = false;
    },
    // 删除tag
    hanlderClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // 删除属性
    deleteAll(row, index) {
      this.spuinfo.spuSaleAttrList.splice(index, 1);
    },
    //保存
    async sendlist() {
      // 过滤图片列表
      this.spuinfo.spuImageList = this.spuimg.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.updateSpuInfo(this.spuinfo);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "修改成功！",
        });
      }
      this.$emit("backt", "list");
      this.$bus.$emit("isdisable", false);
    },
    // 返回
    backList() {
      this.$emit("backt", "list");
      this.$bus.$emit("isdisable", false);
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>