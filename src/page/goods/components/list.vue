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
        <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
        <el-table-column prop="goodsname" label="商品名称" width="150"></el-table-column>
        <el-table-column prop="price" label="商品价格" width="150"></el-table-column>
        <el-table-column prop="market_price" label="市场价格" width="150"></el-table-column>

        <el-table-column label="图片" width="150">
          <template slot-scope="scope">
            <img :src="$host+scope.row.img" class="img" />
          </template>
        </el-table-column>

        <el-table-column label="是否新品">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
            <el-button type="info" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column label="是否热卖">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
            <el-button type="info" v-else>否</el-button>
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
        @current-change="changePage"
      ></el-pagination>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqDelGoodsItem } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  data() {
    return {
      size: 2
    };
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total"
    })
  },
  methods: {
    ...mapActions({
      reqGoodsList: "goods/reqGoodsList",
      reqGoodsTotal: "goods/reqGoodsTotal",
      reqDelListItem: "goods/reqDelListItem"
    }),
    delItem(id) {
      this.$confirm("此操作将永久删除菜单项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqDelGoodsItem(id).then(res => {
            if (res.data.code == 200) {
              // this.reqGoodsList();
              // this.reqGoodsTotal();
              this.reqDelListItem(id);
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
      this.reqGoodsList({ page: vPage * 1, size: this.size });
    },
    alterItem(id) {
      this.$emit("alterItem", id);
    }
  },
  mounted() {
    this.reqGoodsList();
    this.reqGoodsTotal();
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