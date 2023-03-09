<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{ Frow.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          placeholder="输入Sku名称"
          v-model="skuinfo.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input
          placeholder="输入价格（元）"
          v-model="skuinfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input
          placeholder="输入重量（千克）"
          v-model="skuinfo.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="输入Sku名称"
          type="textarea"
          rows="4"
          v-model="skuinfo.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="item.attrName"
            v-for="item in AttrInfo"
            :key="item.id"
          >
            <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
              <el-option
                v-for="attr in item.attrValueList"
                :key="attr.id"
                :label="attr.valueName"
                :value="`${attr.id}:${item.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            :label="item.saleAttrName"
            v-for="item in SpuAttrList"
            :key="item.id"
          >
            <el-select
              placeholder="请选择"
              v-model="item.SaleAttrIdAndSpuAttrId"
            >
              <el-option
                v-for="SaleAttr in item.spuSaleAttrValueList"
                :key="SaleAttr.id"
                :label="SaleAttr.saleAttrValueName"
                :value="`${SaleAttr.id}:${item.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="ImgList"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>
          <el-table-column label="图片" width="200px" align="center">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="width"
            align="center"
            prop="imgName"
          >
          </el-table-column>
          <el-table-column label="操作" width="width" align="center">
            <template slot-scope="{ row, $index }">
              <el-button v-if="row.skuDefaultImg == 1">默认</el-button>
              <el-button type="primary" v-else @click="setDefaultImg(row)"
                >设置默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSku">保存</el-button>
        <el-button @click="backList">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuform",
  data() {
    return {
      skuinfo: {
        category3Id: "",
        price: "",
        spuId: "",
        tmId: "",
        // 默认图片
        skuDefaultImg: "",
        skuDesc: "",
        skuName: "",
        // 收集图片
        skuImageList: [],
        //平台属性
        skuAttrValueList: [],
        //销售属性列表
        skuSaleAttrValueList: [],
        weight: "",
      },
      //存储图片信息
      ImgList: [],
      // 存储销售属性
      SpuAttrList: [],
      // 存储平台属性
      AttrInfo: [],
      // 单独存储一份父类row 含有spuId ,category3Id,spuName等数据
      Frow: {},
      //收集图片
      imageList: [],
    };
  },
  methods: {
    //请求数据
    async addsku(row, ids) {
      // 清空数据
      let skuinfos = {
        category3Id: "",
        price: "",
        spuId: "",
        tmId: "",
        // 默认图片
        skuDefaultImg: "",
        skuDesc: "",
        skuName: "",
        // 收集图片
        skuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            isDefault: "",
            skuId: 0,
            spuImgId: 0,
          },
        ],
        //平台属性
        skuAttrValueList: [
          {
            attrId: 0,
            attrName: "",
            id: 0,
            skuId: 0,
            valueId: 0,
            valueName: "",
          },
        ],

        //销售属性列表
        skuSaleAttrValueList: [
          {
            id: 0,
            saleAttrId: 0,
            saleAttrName: "",
            saleAttrValueId: 0,
            saleAttrValueName: "",
            skuId: 0,
            spuId: 0,
          },
        ],

        weight: "",
      };
      this.skuinfo = skuinfos;

      this.skuinfo.category3Id = ids.category3Id;
      this.skuinfo.tmId = row.tmId;
      this.skuinfo.spuId = row.id;
      this.Frow = row;
      //清空数据

      let ImgResult = await this.$API.sku.reqImgList(row.id);
      if (ImgResult.code == 200) {
        let ImgLists = ImgResult.data;
        ImgLists.forEach((element) => {
          element.skuDefaultImg = 0;
        });
        this.ImgList = ImgLists;
      }
      let SpuAttr = await this.$API.sku.reqSpuAttrList(row.id);
      if (SpuAttr.code == 200) {
        this.SpuAttrList = SpuAttr.data;
      }
      let AttrInfoResult = await this.$API.sku.reqAttrInfoList(ids);
      if (AttrInfoResult.code == 200) {
        this.AttrInfo = AttrInfoResult.data;
      }
    },
    // 设置默认图片
    setDefaultImg(row) {
      this.ImgList.forEach((item) => {
        item.skuDefaultImg = 0;
      });
      row.skuDefaultImg = 1;
      this.skuinfo.skuDefaultImg = row.imgUrl;
    },
    // 保存
    async addSku() {
      // 整理参数
      const { AttrInfo, skuinfo, SpuAttrList, imageList } = this;
      // 整理平台属性
      let arr = [];
      AttrInfo.forEach((item) => {
        if (item.attrIdAndValueId) {
          const [valueId, attrId] = item.attrIdAndValueId.split(":");
          let obj = { attrId, valueId };
          arr.push(obj);
        }
      });
      skuinfo.skuAttrValueList = arr;
      // 整理销售属性
      let arr1 = [];
      SpuAttrList.forEach((item) => {
        if (item.SaleAttrIdAndSpuAttrId) {
          const [saleAttrValueId, saleAttrId] =
            item.SaleAttrIdAndSpuAttrId.split(":");
          let obj = { saleAttrId, saleAttrValueId };
          arr1.push(obj);
        }
      });
      skuinfo.skuSaleAttrValueList = arr1;
      // 整理图片列表
      skuinfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.skuDefaultImg,
          spuImgId: item.id,
        };
      });
      if (isNaN(Number(skuinfo.weight)) || isNaN(Number(skuinfo.price))) {
        this.$message.error("输入有误！");
      } else {
        let result = await this.$API.sku.saveSkuInfo(skuinfo);
        if ((result.code = 200)) {
          this.$message({
            type: "success",
            message: "添加成功！",
          });
          this.$emit("backt", "list");
          this.$bus.$emit("isdisable", false);
        } else {
          this.$message.error("添加失败");
        }
      }
    },
    // 返回
    backList() {
      this.$emit("backt", "list");
      this.$bus.$emit("isdisable", false);
    },
    handleSelectionChange(val) {
      this.imageList = val;
    },
  },
};
</script>

<style>
</style>