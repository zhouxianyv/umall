<template>
  <div>
    <el-button type="primary" @click="showAdd">添加</el-button>
    <v-list @alterItem='alterItem'></v-list>
    <v-add :info="isShow" ref="alterItem"></v-add>
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
    alterItem(id){
      this.isShow.isShow=true;
      this.$refs.alterItem.getSpecsItem(id);
    }
  }
};
</script>

<style>
</style>