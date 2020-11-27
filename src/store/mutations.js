import router from "../router"

export const state = {
    user:sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{}
}
export const mutations = {
    changeUser(state,obj){
        state.user=obj;
        if(obj.id){
            sessionStorage.setItem('user',JSON.stringify(obj));
        }else{
            sessionStorage.removeItem('user');
        }
    }
}
export const getters = {
    user(state){
        return state.user;
    }
}
