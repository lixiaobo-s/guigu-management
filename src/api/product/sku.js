import request from "@/utils/request";
// 请求图片
export const reqImgList = (spuId) => {
    return request.serviceport({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get'
    })
}
//请求销售属性
export const reqSpuAttrList = (spuId) => {
    return request.serviceport({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: 'get'
    })
}
// 获取平台属性
export const reqAttrInfoList = (ids) => {
    const { category1Id, category2Id, category3Id } = ids;
    return request.serviceport({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    })
}
// 添加Sku

export const saveSkuInfo = (skuInfo) => {
    return request.serviceport({
        url: '/admin/product/saveSkuInfo',
        data: skuInfo,
        method: 'post'
    })
}
// 获取sku数据接口
export const reqSkuListById = (spuId) => {
    return request.serviceport({
        url: `/admin/product/findBySpuId/${spuId}`,
        method: 'get'
    })
}

//Sku部分

// 获取sku列表
export const reqSkuList = (page, limit) => {
    return request.serviceport({
        url: `/admin/product/list/${page}/${limit}`,
        method: 'get'
    })
}
// 删除
export const reqDeleteSkuById = (skuId) => {
    return request.serviceport({
        url: `/admin/product/deleteSku/${skuId}`,
        method: 'delete'
    })
}
// 上架商品
export const reqSale = (skuId) => {
    return request.serviceport({
        url: `/admin/product/onSale/${skuId}`,
        method: 'get',
    })
}
// 下架
export const reqUnSale = (skuId) => {
    return request.serviceport({
        url: `/admin/product/cancelSale/${skuId}`,
        method: 'get',
    })
}

//获取详情
export const reqskuDesc = (skuId) => {
    return request.serviceport({
        url: `/admin/product/getSkuById/${skuId}`,
        method: "get"
    })
}

export default {
    reqImgList,
    reqSpuAttrList,
    reqAttrInfoList,
    saveSkuInfo,
    reqSkuListById,
    reqSkuList,
    reqDeleteSkuById,
    reqSale,
    reqUnSale,
    reqskuDesc,

}