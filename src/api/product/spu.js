
import request from "@/utils/request";

//获取spu列表
export const reqSupList = (page, limit, category3Id) => {
    return request.serviceport({
        url: `/admin/product/${page}/${limit}`,
        method: 'get',
        params: { category3Id },
    })
}
//获取spu信息 
export const reqSupInfobyId = (spuId) => {
    return request.serviceport({
        url: `/admin/product/getSpuById/${spuId}`,
        method: 'get',
    })
}
// 获取品牌信息
export const reqTradeMark = () => {
    return request.serviceport({
        url: '/admin/product/baseTrademark/getTrademarkList',
        method: 'get',
    })
}
// 获取图片的spu
export const reqSpuImageList = (spuId) => {
    return request.serviceport({
        url: `/admin/product/spuImageList/${spuId}`,
        method: "get",
    })
}
//获取平台销售属性
export const reqAllSaleAttrList = () => {
    return request.serviceport({
        url: '/admin/product/baseSaleAttrList',
        method: 'get',
    })
}
// 修改spu
export const updateSpuInfo = (spuInfo) => {
    // 更新
    if (spuInfo.id) {
        return request.serviceport({
            url: '/admin/product/updateSpuInfo',
            data: spuInfo,
            method: 'post',

        })
    }
    // 添加
    return request.serviceport({
        url: '/admin/product/saveSpuInfo',
        data: spuInfo,
        method: 'post',

    })
}
// 删除
export const deleteSpuById = (spuId) => {
    return request.serviceport({
        url: `/admin/product/deleteSpu/${spuId}`,
        method: 'delete'
    })
}
export default {
    reqSupList,
    reqSupInfobyId,
    reqTradeMark,
    reqSpuImageList,
    reqAllSaleAttrList,
    updateSpuInfo,
    deleteSpuById,
}