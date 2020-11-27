<template>
  <div>
    <template>
      <el-table
        :data="list"
        border
        style="width: 100%;margin-bottom:20px;"
        row-key="id"
        :tree-props="{children:'children'}"
      >
        <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status">启 用</el-button>
            <el-button type="info" v-else>禁 用</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="alterItem(scope.row)">编辑</el-button>
            <el-button type="danger" @click="delItem(scope.row.uid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="size"
        :total="total"
        @current-change="changePage"
      ></el-pagination>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqDelManageItem } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  data() {
    return {
      size: 2
    };
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      total: "manage/total"
    })
  },
  methods: {
    ...mapActions({
      reqManageList: "manage/reqManageList",
      reqManageTotal: "manage/reqManageTotal"
    }),
    delItem(uid) {
      this.$confirm("此操作将永久删除菜单项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqDelManageItem(uid).then(res => {
            if (res.data.code == 200) {
              this.reqManageList();
              this.reqManageTotal();
              successAlert(res.data.msg);
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changePage(vPage) {
      this.reqManageList({ page: vPage * 1, size: this.size });
    },
    alterItem(obj) {
      this.$emit("alterItem", obj);
    }
  },
  mounted() {
    this.reqManageList({ page:1, size: this.size });
    this.reqManageTotal();
  }
};
</script>

<style>
</style>