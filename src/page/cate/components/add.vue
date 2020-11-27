<template>
  <div>
    <el-dialog :title="isAtler?'商品分类修改':'商品分类添加'" @close="close" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="'120px'">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option label="顶级商品分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="'120px'">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="'120px'">
          <div class="imgBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl" />
            <input type="file" @change="changeImg" v-if="info.isShow" />
          </div>
        </el-form-item>

        <el-form-item label="状态" :label-width="'120px'">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
  reqCateAdd,
  reqAtlerCateItem,
  reqCateItem
} from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info"],
  data() {
    return {
      isAtler: false,
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1
      }
    };
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
        pid: 0,
        catename: "",
        img: "",
        status: 1
      };
      this.imgUrl = "";
    },
    getCateItem(id) {
      this.isAtler = true;
      reqCateItem(id).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$host + res.data.list.img;
      });
    },
    changeImg(e) {
      let file = e.target.files[0];
      this.form.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
    add() {
      reqCateAdd(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqCateList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    alter() {
      console.log(this.form);
      reqAtlerCateItem(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqCateList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
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