import {reqSpecsList,reqSpecsTotal} from '../../util/request';
const state ={
    list:[],
    total:0
}
const mutations={
    changeList(state,arr){
        arr.forEach(item=>{
            item.attrs=JSON.parse(item.attrs.join()); 
        });
        state.list=arr;
    },
    changeTotal(state,total){
        state.total=total;
    }
}
const actions={
    reqSpecsList(context,{size,page}={size:2,page:1}){
        reqSpecsList(size,page).then(res=>{
            context.commit('changeList',res.data.list?res.data.list:[]);
        });
    },
    reqSpecsTotal(context){
        reqSpecsTotal().then(res=>{
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