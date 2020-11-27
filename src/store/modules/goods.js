import {reqGoodsList,reqGoodsTotal} from '../../util/request';
const state ={
    list:[],
    total:0
}
const mutations={
    changeList(state,arr){
        state.list=arr;
    },
    delListItem(state,id){
        state.list=state.list.filter(item=>item.id!=id);
        state.total-=1;
    },
    changeTotal(state,total){
        state.total=total;
    }
}
const actions={
    reqGoodsList(context,obj){
        reqGoodsList(obj).then(res=>{
            context.commit('changeList',res.data.list?res.data.list:[]);
        });
    },
    reqGoodsTotal(context){
        reqGoodsTotal().then(res=>{
            context.commit('changeTotal',res.data.list[0].total);
        });
    },
    reqDelListItem(context,id){
        context.commit('delListItem',id);
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