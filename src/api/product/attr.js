//平台属性
import request from '@/utils/request';
//获取一级分类
export const reqGetOne = () => {
    return request.serviceport({
        url: '/admin/product/getCategory1',
        method: 'get'
    })
}
//获取二级分类
export const reqGetTwo = (category1Id) => {
    return request.serviceport({
        url: `/admin/product/getCategory2/${category1Id}`,
        method: 'get'
    })
}
// 获取三级分类
export const reqGetThree = (category2Id) => {
    return request.serviceport({
        url: `/admin/product/getCategory3/${category2Id}`,
        method: 'get'
    })
}
// 获取内容
export const reqList = (ids) => {
    const { Category1Id, Category2Id, Category3Id } = ids
    return request.serviceport({
        url: `/admin/product/attrInfoList/${Category1Id}/${Category2Id}/${Category3Id}`,
        method: 'get'
    })
}
//添加属性
export const addCategory = (data) => {
    return request.serviceport({
        url: '/admin/product/saveAttrInfo',
        data,
        method: 'post'
    })
}
//删除
export const deleteCategory = (attrId) => {
    return request.serviceport({
        url: `/admin/product/deleteAttr/${attrId}`,
        method: 'delete'
    })
}
export default {
    reqGetOne,
    reqGetTwo,
    reqGetThree,
    reqList,
    addCategory,
    deleteCategory,
}