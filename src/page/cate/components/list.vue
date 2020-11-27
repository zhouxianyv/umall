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
        <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
        <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="$host+scope.row.img" class="img" />
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
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqDelCateItem, reqAlterItem } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqCateList"
    }),
    delItem(id) {
      this.$confirm("此操作将永久删除菜单项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqDelCateItem(id).then(res=>{
            if(res.data.code==200){
                this.reqCateList();
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
    alterItem(id) {
      this.$emit("alterItem",id);
    }
  },
  mounted() {
    this.reqCateList();
  }
};
</script>

<style scoped>
.img {
  display: block;
  width: 80px;
  height: 80px;
}
</style>