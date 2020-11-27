<template>
  <div>
    <div id="box"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(box);
        var option = {
          title: {
            text: "商品分类"
          },
          tooltip: {},
          legend: {
            data: ["数量"]
          },
          xAxis: {
            data:this.list.map(item =>item.catename)
          },
          yAxis: {},
          series: [
            {
              name: "数量",
              type: "line",
              data: this.list.map(item => item.children.length)
            }
          ]
        };
        myChart.setOption(option);
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqCateList"
    })
  },
  mounted() {
    this.reqCateList();
  }
};
</script>

<style scoped>
#box {
  width: 80%;
  height: 80vh;
}
</style>