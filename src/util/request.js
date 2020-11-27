import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';

// 开发环境下的变量配置
// Vue.prototype.$host='http://localhost:3000/';
// const baseUrl = '/api';

// 上线环境下的变量配置
Vue.prototype.$host='';
const baseUrl = '';

axios.interceptors.response.use(res => {
    console.log('=====本次请求的路径：' + res.config.url + '=====');
    console.log(res);
    console.log('=====请求结束=====');
    return res;
});
/*==========menu请求==========*/
//添加
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        data: qs.stringify(form)
    });
}
//获取菜单列表数据
export const reqMenuList = (form) => {
    return axios({
        url: baseUrl + '/api/menulist',
        method: 'get',
        params: {
            istree: true
        }
    });
}
//删除一条数据
export const reqDelMenuItem = (id) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: qs.stringify({id})
    });
}
//修改一条数据
export const reqAtlerMenuItem = (obj) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(obj)
    });
}
/*==========role请求==========*/
//添加
export const reqRoleAdd = (form) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(form)
    });
}
//获取角色列表数据
export const reqRoleList = (form) => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get'
    });
}
//删除一条数据
export const reqDelRoleItem = (id) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: qs.stringify({id})
    });
}
//修改一条数据
export const reqAtlerRoleItem = (obj) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: qs.stringify(obj)
    });
}
/*==========manage请求==========*/
//添加
export const reqManageAdd = (form) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(form)
    });
}
//管理员总数（用于计算分页）
export const reqManageTotal = () => {
    return axios({
        url: baseUrl + '/api/usercount',
        method: 'get',
    });
}
//获取管理员列表（分页）
export const reqManageList = (obj) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params:obj
    });
}
//删除一条数据
export const reqDelManageItem = (uid) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: qs.stringify({uid})
    });
}
//修改一条数据
export const reqAtlerManageItem = (obj) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: qs.stringify(obj)
    });
}
/*==========cate请求==========*/
//添加商品分类
export const reqCateAdd = (form) => {
    let data=new FormData();
    for (const key in form) {
        data.append(key,form[key]);
    }
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: data
    });
}
//获取商品分类列表
export const reqCateList = (pid) => {
    return axios({
        url: baseUrl + '/api/catelist',
        method: 'get',
        params:{
            istree:true,
            pid
        }
    });
}
//获取一条数据
export const reqCateItem = (id) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: 'get',
        params:{id}
    });
}
//修改一条数据
export const reqAtlerCateItem = (obj) => {
    let data=new FormData();
    for (const key in obj) {
        data.append(key,obj[key]);
    }
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: data
    });
}
//删除一条数据
export const reqDelCateItem = (id) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: qs.stringify({id})
    });
}
/*==========specs请求==========*/
//添加
export const reqSpecsAdd = (form) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: qs.stringify(form)
    });
}
//管理员总数（用于计算分页）
export const reqSpecsTotal = () => {
    return axios({
        url: baseUrl + '/api/specscount',
        method: 'get',
    });
}
//获取管理员列表（分页）
export const reqSpecsList = (size,page) => {
    return axios({
        url: baseUrl + '/api/specslist',
        method: 'get',
        params:{
            size,
            page
        }
    });
}
//获取一条数据
export const reqSpecsItem = (id) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        method: 'get',
        params:{id}
    });
}
//修改一条数据
export const reqAtlerSpecsItem = (obj) => {
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data: qs.stringify(obj)
    });
}
//删除一条数据
export const reqDelSpecsItem = (id) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: qs.stringify({id})
    });
}
/*==========goods请求==========*/
//添加商品
export const reqGoodsAdd = (form) => {
    let data=new FormData();
    for (const key in form) {
        data.append(key,form[key]);
    }
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data: data
    });
}
//获取商品总数
export const reqGoodsTotal = (pid) => {
    return axios({
        url: baseUrl + '/api/goodscount',
        method: 'get'
    });
}
//获取商品列表
export const reqGoodsList = (obj) => {
    return axios({
        url: baseUrl + '/api/goodslist',
        method: 'get',
        params:obj
    });
}
//获取一条数据
export const reqGoodsItem = (id) => {
    return axios({
        url: baseUrl + '/api/goodsinfo',
        method: 'get',
        params:{id}
    });
}
//修改一条数据
export const reqAtlerGoodsItem = (obj) => {
    let data=new FormData();
    for (const key in obj) {
        data.append(key,obj[key]);
    }
    return axios({
        url: baseUrl + '/api/goodsedit',
        method: 'post',
        data: data
    });
}
//删除一条数据
export const reqDelGoodsItem = (id) => {
    return axios({
        url: baseUrl + '/api/goodsdelete',
        method: 'post',
        data: qs.stringify({id})
    });
}
/*==========login请求==========*/
//管理员登录
export const reqManageLogin = (obj) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: qs.stringify(obj)
    });
}