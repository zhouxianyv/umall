import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'
Vue.use(Router);
const routerGuard = (path, next) => {
  //  if(store.state.user.menus_url.includes(path)){
  //    console.log(store.state.user.menus_url.includes(path));
  //    next();
  //  }else{
  //    next('/');
  //  }
  let menus_url = store.state.user.menus_url
  if (menus_url.includes(path)) {
    next()
  } else {
    next("/")
  }
};
export const indexRoutes = [
  {
    path: 'menu',
    name: '菜单管理',
    component: () => import('../page/menu/menu.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/menu', next);
    }
  },
  {
    path: 'role',
    name: '角色管理',
    component: () => import('../page/role/role.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/role', next);
    }
  },
  {
    path: 'manage',
    name: '管理员管理',
    component: () => import('../page/manage/manage.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/manage', next);
    }
  },
  {
    path: 'cate',
    name: '商品分类',
    component: () => import('../page/cate/cate.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/cate', next);
    }
  },
  {
    path: 'specs',
    name: '商品规格',
    component: () => import('../page/specs/specs.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/specs', next);
    }
  },
  {
    path: 'goods',
    name: '商品管理',
    component: () => import('../page/goods/goods.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/goods', next);
    }
  },
  {
    path: 'member',
    name: '会员管理',
    component: () => import('../page/member/member.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/member', next);
    }
  },
  {
    path: 'banner',
    name: '轮播图管理',
    component: () => import('../page/banner/banner.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/banner', next);
    }
  },
  {
    path: 'seckill',
    name: '秒杀活动',
    component: () => import('../page/seckill/seckill.vue'),
    beforeEnter: (to, from, next) => {
      routerGuard('/seckill', next);
    }
  }
];
const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../page/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../page/index/index.vue'),
      children: [
        {
          path: '',
          component: () => import('../page/home/home.vue')
        },
        ...indexRoutes
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next();
    return true;
  }
  if (store.state.user.token) {
    next();
    return true;
  }
  next('/login');
});
export default router;
