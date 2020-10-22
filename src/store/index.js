import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileList:[],
    tree:[],
    iconRef:{},
    code:""
  },
  mutations: {
    setFiles(state, files){
      state.fileList = files
    }
  },
  actions: {
  },
  modules: {
  }
})
