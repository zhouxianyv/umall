<template>
  <div>
    <el-dialog :title="menuObj.id?'菜单修改':'菜单添加'" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="'120px'">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="'120px'">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="form.type = form.pid == 0 ? 1 : 2;"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="'120px'">
          <el-radio :label="1" v-model="form.type" disabled>目录</el-radio>
          <el-radio :label="2" v-model="form.type" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" :label-width="'120px'" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="'120px'" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="'120px'">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="alter" v-if="menuObj.id">修改</el-button>
        <el-button type="primary" @click="add" v-else>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import { reqMenuAdd, reqAtlerMenuItem } from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info", "menuObj"],
  data() {
    return {
      region: 1,
      indexRoutes: indexRoutes,
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-release"
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      }
    };
  },
  watch: {
    "info.isShow"() {
      if (this.menuObj.id) { 
        this.form = this.menuObj;
      }else{
        this.empty();
      }
    }
  },
  computed: {
    ...mapGetters({
      list: "menu/list"
    })
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/reqMenuList"
    }),
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    add() {
      reqMenuAdd(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqMenuList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    alter() {
      reqAtlerMenuItem(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqMenuList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style>
</style>