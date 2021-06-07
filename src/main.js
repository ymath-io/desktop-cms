import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSplit from 'vue-split-panel'
import vuetify from './plugins/vuetify';
Vue.use(VueSplit)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

const fs =require('fs')
const path = require('path')
const homedir = require('os').homedir();
const directoryPath = path.join(homedir, 'WebstormProjects','desktop-cms' )//'ymath-nuxt-tailwind', 'content')


/*fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  let fileObj = []
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    //console.log(file)

    //const contents =  fs.readFileSync(path.join(directoryPath,file),'utf-8')
    //console.log(contents)

    fileObj.push({
      name:file,
      contents:"temp"//contents
    })
  });
  console.dir(fileObj)
  store.commit('setFiles',fileObj);
  console.dir(store.state.fileList)

});*/
const {walkDir, compareFiles} = require('./plugins/loadDirectory')

const fileObj = walkDir(directoryPath, true).sort(compareFiles)// sort alphabetically
store.commit('setFiles',fileObj);
