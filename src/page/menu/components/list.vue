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
        <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>
        <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
        <el-table-column label="菜单图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="菜单地址"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status">启 用</el-button>
            <el-button type="info" v-else>禁 用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="alterItem(scope.row)">编辑</el-button>
            <el-button type="danger" @click="delItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqDelMenuItem,reqAlterItem } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  data() {
    return {};
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
    delItem(id) {
      this.$confirm("此操作将永久删除菜单项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqDelMenuItem(id).then(res=>{
            if(res.data.code==200){
                this.reqMenuList();
                successAlert(res.data.msg);
            }else{
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
    alterItem(obj){
      this.$emit('alterItem',obj);
    }
  },
  mounted() {
    this.reqMenuList();
  }
};
</script>

<style>
</style>