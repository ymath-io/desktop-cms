import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSplit from 'vue-split-panel'
Vue.use(VueSplit)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const fs =require('fs')
const path = require('path')
const homedir = require('os').homedir();
const directoryPath = path.join(homedir,'SchemeItProjects','trial0')


  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file)
    });
    store.commit('setFiles',files);

  });

