<template>
  <div class="login">
    <div class="box">
      <h3>登录</h3>
      <div>
        <el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input>
      </div>
      <div>
        <el-input placeholder="请输入密码" v-model="user.password" clearable show-password></el-input>
      </div>
      <div>
        <el-button type="primary" class="btn" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqManageLogin } from "../../util/request";
import { successAlert, warningAlert } from "../../util/alert";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
        reqChangeUser:'reqChangeUser'
    }),
    login() {
      reqManageLogin(this.user).then(res => {
        if (res.data.code == 200) {
          console.log(res);
          this.reqChangeUser(res.data.list);
          successAlert(res.data.msg);
          this.$router.push('/');
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
  background: linear-gradient(to right, #553443, #2f3d60);
  overflow: hidden;
}
.box {
  width: 500px;
  height: 300px;
  background-color: #fff;
  margin: 160px auto;
  padding: 30px 80px 0 80px;
  text-align: center;
  border-radius: 10px;
}
.box > h3 {
  font-size: 24px;
}
.box > div {
  margin-top: 20px;
}
.btn,
.btn span {
  display: block;
  width: 100%;
}
</style>