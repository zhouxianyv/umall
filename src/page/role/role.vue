<template>
  <div>
    <el-button type="primary" @click="showAdd">添加</el-button>
    <v-list @alterItem='alterItem'></v-list>
    <v-add :info="isShow" :roleItem='roleObj' :isAdd='isAdd'></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      isAdd:[true],
      roleObj:{},
      isShow: {
        isShow: false
      },
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    showAdd() {
      this.isShow.isShow = true;
    },
    alterItem(obj){
      this.isShow.isShow=true;
      this.roleObj=obj;
      this.isAdd=[false];
    }
  }
};
</script>

<style>
</style>