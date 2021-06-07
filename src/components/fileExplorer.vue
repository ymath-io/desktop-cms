<template>
  <div>
    <v-card-title style="color:white">Project Files</v-card-title>
    <v-treeview dark dense
                :items="$store.state.fileList"
                activatable
                :load-children="loadChildren"
                hoverable
                return-object
                v-model="$store.state.tree"
                open-on-click
                @update:active="openFile"
                item-key="path">
      <template v-slot:prepend="{ item, open }">
        <v-icon color="amber" v-if="item.isDir">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon color="primary" v-else>
          {{
            ((ext)=>{
                switch (ext) {
                  case '.md':
                        return 'mdi-language-markdown';
                  default:
                        return 'mdi-file';
                }
            })(item.extension)
          }}
        </v-icon>
      </template>
      <template @click="$store.state.file = item" v-slot:label="{item, leaf}">
        <span>{{ item.name }}</span>
      </template>
    </v-treeview>
  </div>
</template>

<script>
const fs = require('fs');
const {walkDir, compareFiles} = require('../plugins/loadDirectory')
export default {
  name: "fileExplorer",
  methods: {
    async loadChildren(item) {
      item.children = walkDir(item.path);
    },
    openFile(obj) {
      this.$store.state.file = obj[0]
      /**
       * theFile is basically the file object, with an extra `content` property
       */
      /*const theFile = this.$store.state.fileList.filter(function (f) {
        return f.name === obj[0]
      })[0]
      if (theFile && theFile.content) {
        this.$store.state.file = theFile
        //console.log(this.$store.state.file)
      }*/
    },
    logit:console.log
  }
}
</script>

<style scoped>

</style>
