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
const directoryPath = path.join(homedir,'WebstormProjects','virtual-campus')


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
function compareFiles(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.name.toUpperCase();
  const bandB = b.name.toUpperCase();
  if (a.isDir && !b.isDir){
    return -1
  }
  else if (!a.isDir && b.isDir){
    return 1
  }
  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

function walkDir(directoryPath){
  console.log("Indexing ",directoryPath)
  return fs.readdirSync(directoryPath,{withFileTypes: true}).map(item => {
    const isDir = item.isDirectory()
    let obj = {name:item.name,
      path:path.join(directoryPath,item.name),
      isDir
    }
    // this is where we can ignore and hide things
    if (isDir && ![".git",".schemeit","node_modules"].includes(item.name)){
      // we redo
      obj.children = walkDir(path.join(directoryPath,item.name)).sort(compareFiles)
    }
    else if (![".git",".schemeit",".DS_Store","node_modules"].includes(item.name)) {
      obj.file = item.name.split('.')[1]
      obj.content = fs.readFileSync(path.join(directoryPath,item.name),'utf-8');
    }
    return obj
  })
}

const fileObj = walkDir(directoryPath).sort(compareFiles)// sort alphabetically
store.commit('setFiles',fileObj);
