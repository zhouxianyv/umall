import Vue from 'vue';
let obj={

};
for (const i in obj) {
    Vue.filter(i,obj[i]);
}
