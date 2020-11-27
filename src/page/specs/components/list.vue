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
        <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
        <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
        <el-table-column prop="rolename" label="规格属性" width="180">
          <template slot-scope='scope'>
            <el-tag type v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status">启 用</el-button>
            <el-button type="info" v-else>禁 用</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="alterItem(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="delItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="size"
        :total="total"
        @current-change="changePage"></el-pagination>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqDelSpecsItem } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  data() {
    return {
      size: 2,
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total"
    })
  },
  methods: {
    ...mapActions({
      reqSpecsList: "specs/reqSpecsList",
      reqSpecsTotal: "specs/reqSpecsTotal"
    }),
    delItem(id) {
      this.$confirm("此操作将永久删除菜单项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqDelSpecsItem(id).then(res => {
            if (res.data.code == 200) {
              this.reqSpecsList();
              this.reqSpecsTotal();
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
      this.reqSpecsList({ page: vPage * 1, size: this.size });
    },
    alterItem(obj) {
      this.$emit("alterItem", obj);
    }
  },
  mounted() {
    this.reqSpecsList({ page: 1, size: this.size });
    this.reqSpecsTotal();
  }
};
</script>

<style>
</style>