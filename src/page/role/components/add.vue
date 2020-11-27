<template>
  <div>
    <el-dialog :title="form.id?'角色编辑':'角色添加'" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="'120px'">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="'120px'">
          <el-tree
            :data="list"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="'120px'">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="alter" v-if="form.id">修改</el-button>
        <el-button type="primary" @click="add" v-else>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import { reqRoleAdd, reqAtlerRoleItem } from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info", "roleItem", "isAdd"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list"
    })
  },
  watch: {
    "info.isShow"(vNew) {
      if (!vNew) {
        this.empty();
      }
      if (vNew && !this.isAdd[0]) {
        this.form = this.roleItem;
      }
    }
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/reqMenuList",
      reqRoleList: "role/reqRoleList"
    }),
    cancel() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    alter() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqAtlerRoleItem(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  updated() {
    if (this.$refs.tree && !this.isAdd[0]) {
      this.isAdd[0] = !this.isAdd[0];
      this.$refs.tree.setCheckedKeys(JSON.parse(this.roleItem.menus));
    }
  },
  mounted() {
    this.reqMenuList();
  }
};
</script>

<style>
</style>