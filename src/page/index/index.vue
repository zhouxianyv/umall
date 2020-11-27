<template>
  <el-container class="box">
    <el-aside>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        style="border:none;"
        background-color="#20222a"
        text-color="#fff"
        router
        unique-opened
        active-text-color="#ffd04b"
      >
        <!-- 首页 -->
        <el-menu-item index="/">
          <i class="el-icon-location"></i>
          <span>首页</span>
        </el-menu-item>

        <div v-for="item in menuList" :key="item.id">
          <!-- 目录 -->
          <el-submenu :index="item.id+''" v-if="item.children">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">
                <span>{{i.title}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 菜单 -->
          <el-menu-item :index="item.url" v-else>
            <span>{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class='headerBox'>
          <span>{{user.username}}</span>
          <el-button @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      menuList: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    ...mapActions({
      reqChangeUser: "reqChangeUser"
    }),
    logout(){
      this.reqChangeUser({});
      sessionStorage.removeItem('user');
      this.$router.push('/login');
    }
  },
  mounted() {
    this.menuList = this.user.menus;
  }
};
</script>

<style scoped>
.box {
  height: 100vh;
}
.box > section > header {
  height: 65px !important;
  background-color: #b3c0d1;
}
.box > aside {
  width: 150px !important;
  background-color: #20222a;
}
.headerBox{
  text-align: right;
  line-height: 65px;
  padding-right: 30px;
}
.headerBox span{
  margin-right: 20px;
}
</style>