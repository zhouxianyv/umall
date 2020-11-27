import {reqManageList,reqManageTotal} from '../../util/request';
const state ={
    list:[],
    total:0
}
const mutations={
    changeList(state,arr){
        state.list=arr;
    },
    changeTotal(state,total){
        state.total=total;
    }
}
const actions={
    reqManageList(context,{size,page}={size:2,page:1}){
        reqManageList({size,page}).then(res=>{
            context.commit('changeList',res.data.list?res.data.list:[]);
        });
    },
    reqManageTotal(context){
        reqManageTotal().then(res=>{
            context.commit('changeTotal',res.data.list[0].total);
        });
    }
}
const getters={
    list(state){
        return state.list;
    },
    total(state){
        return state.total;
    }
}
export default{
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}