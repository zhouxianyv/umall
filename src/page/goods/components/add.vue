<template>
  <div>
    <el-dialog :title="isAtler?'商品分类修改':'商品分类添加'" @close="close" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="'120px'">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="cateChange">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="'120px'">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in cateChildrenList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="'120px'">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="'120px'">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="'120px'">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="'120px'">
          <div class="imgBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" />
            <input type="file" @change="changeImg" v-if="info.isShow" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="'120px'">
          <el-select v-model="form.specsid" placeholder="请选择" @change="specsChange">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="'120px'">
          <el-select v-model="form.specsattr" placeholder="请选择">
            <el-option v-for="item in specsChildrenList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="'120px'">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="'120px'">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="'120px'">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" :label-width="'120px'">
          <el-input type="textarea" v-model="form.description" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="alter" v-if="isAtler">修改</el-button>
        <el-button type="primary" @click="add" v-else>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { indexRoutes } from "../../../router/index";
import {
  reqGoodsAdd,
  reqAtlerGoodsItem,
  reqGoodsItem
} from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info"],
  data() {
    return {
      cateChildrenList: [],
      specsChildrenList: [],
      isAtler: false,
      imgUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list"
    })
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqCateList",
      reqSpecsList: "specs/reqSpecsList"
    }),
    cateChange() {
      this.cateChildrenList = [
        ...this.cateList.find(item => item.id == this.form.first_cateid)
          .children
      ];
    },
    specsChange() {
      this.specsChildrenList = this.specsList.find(
        item => item.id == this.form.specsid
      ).attrs;
    },
    close() {
      this.empty();
      this.isAtler = false;
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "[]",
        isnew: 1,
        ishot: 1,
        status: 1
      };
      this.imgUrl = "";
    },
    getGoodsItem(id) {
      this.isAtler = true;
      reqGoodsItem(id).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$host + res.data.list.img;
        this.cateChange();
        this.specsChange();
      });
    },
    changeImg(e) {
      let file = e.target.files[0];
      this.form.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
    add() {
      reqGoodsAdd(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    alter() {
      reqAtlerGoodsItem(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList();
  }
};
</script>

<style scoped>
.imgBox {
  width: 153px;
  height: 153px;
  border: 1.5px dashed #000;
  position: relative;
}
.imgBox input {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0;
  left: 0;
  opacity: 0;
}
.imgBox img {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0;
  left: 0;
}
.imgBox h3 {
  font-size: 40px;
  line-height: 150px;
  text-align: center;
}
</style>