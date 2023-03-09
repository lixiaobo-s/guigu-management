import mockrequest from "@/utils/mockrequest";
const state = {
    datas: {},
};
const mutations = {
    GETDATA(state, value) {
        state.datas = value;
    }
};
const actions = {
    async getData({ commit }) {
        let result = await mockrequest.service('/home/list');
        if (result.code == 200) {
            commit('GETDATA', result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters

}