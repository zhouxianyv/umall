<template>
  <div>
    <el-dialog :title="manageObj.uid?'用户修改':'用户添加'" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="'120px'">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="'120px'">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="'120px'">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="'120px'">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="alter" v-if="manageObj.id">修改</el-button>
        <el-button type="primary" @click="add" v-else>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import { reqManageAdd, reqAtlerManageItem } from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info", "manageObj"],
  data() {
    return {
      form: {
        uid: 0,
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    };
  },
  watch: {
    "info.isShow"() {
      if (this.manageObj.uid) {
        this.form = this.manageObj;
        this.form.password='';
      } else {
        this.empty();
      }
    }
  },
  computed: {
    ...mapGetters({
      list: "role/list"
    })
  },
  methods: {
    ...mapActions({
      reqRoleList: "role/reqRoleList",
      reqManageList: "manage/reqManageList",
      reqManageTotal: "manage/reqManageTotal"
    }),
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        uid: 0,
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    add() {
      reqManageAdd(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqManageList();
          this.reqManageTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    alter() {
      reqAtlerManageItem(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqManageList();
          this.reqManageTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqRoleList();
  },
};
</script>

<style>
</style>