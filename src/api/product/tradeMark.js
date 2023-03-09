// // 品牌管理
import request from '@/utils/request'
//获取品牌列表的接口
export const reqTradeMarkList = (page, limit) => {
    return request.serviceport({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: 'get'
    })
};
// 新增
export const updatedMark = (data) => {
    return request.serviceport({
        url: '/admin/product/baseTrademark/save',
        data,
        method: 'post',
    })
}
// 修改品牌
export const updatedMarkById = (data) => {
    return request.serviceport({
        url: '/admin/product/baseTrademark/update',
        data,
        method: 'put',
    })
}
// 删除
export const delateMarkById = (id) => {
    return request.serviceport({
        url: `/admin/product/baseTrademark/remove/${id}`,
        method: "delete"
    })
}
export default {
    reqTradeMarkList,
    updatedMark,
    updatedMarkById,
    delateMarkById,
}
