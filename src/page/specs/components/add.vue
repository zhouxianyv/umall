<template>
  <div>
    <el-dialog :title="isAtler?'用户修改':'用户添加'" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="'120px'">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item,index) in specsArr"
          :key="index"
          label="规格属性"
          :label-width="'120px'"
        >
          <div class="specsBox">
            <el-input v-model="specsArr[index]"></el-input>
            <el-button type="primary" v-if="index==0" @click="addSpecs">新增规格属性</el-button>
            <el-button type="danger" v-else @click="delSpecs(index)">删除</el-button>
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
import { reqSpecsAdd, reqAtlerSpecsItem ,reqSpecsItem} from "../../../util/request.js";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info"],
  data() {
    return {
      isAtler: false,
      specsArr: ["", ""],
      form: {
        specsname: "",
        attrs: "[]",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqSpecsList: "specs/reqSpecsList",
      reqSpecsTotal: "specs/reqSpecsTotal"
    }),
    getSpecsItem(id) {
      this.isAtler = true;
      reqSpecsItem(id).then(res => {
        this.form=res.data.list[0];
        this.specsArr=JSON.parse(res.data.list[0].attrs.join());
      });
    },
    addSpecs() {
      this.specsArr.push("");
    },
    delSpecs(index) {
      this.specsArr.splice(index, 1);
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    close() {
      this.empty();
      this.isAtler = false;
    },
    empty() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1
      };
      this.specsArr = ["", ""];
    },
    add() {
      this.form.attrs = JSON.stringify(
        this.specsArr.filter(item => item != "")
      );
      reqSpecsAdd(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqSpecsList();
          this.reqSpecsTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    alter() {
      this.form.attrs = JSON.stringify(
        this.specsArr.filter(item => item != "")
      );
      reqAtlerSpecsItem(this.form).then(res => {
        if (res.data.code == "200") {
          successAlert(res.data.msg);
          this.cancel();
          this.reqSpecsList();
          this.reqSpecsTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.specsBox {
  display: flex;
}
.specsBox input {
  flex: 1;
}
</style>