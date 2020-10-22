<template>
  <v-app  class="home">
    <v-app-bar dark class="titlebar" style="text-align: center;child-align: middle"  color="warning">
      <v-toolbar-title style="text-align: center;child-align: middle" class="ml-15">Scheme It</v-toolbar-title>
    </v-app-bar>
    <Split style="background-color: #1f2020;height: 97vh">
      <SplitArea  :size="15">
        <file-explorer style="overflow: scroll;height: 100vh"/>
      </SplitArea>
      <SplitArea :size="85">
        <Split direction="vertical">
          <SplitArea :size="75">
            <MonacoEditor
                    
                    v-model="$store.state.code"
                    class="editor"
                    theme="vs-dark"
                    language="scheme"
                    :options="options"
                    @change="onChange"
                    height="100%"
            ></MonacoEditor>
          </SplitArea>
          <SplitArea :size="25">
            <MonacoEditor
          
                    
                    class="editor"
                    theme="vs-dark"
                    language="scheme"
                    :options="options"
                    @change="onChange"
                    height="100%"
            ></MonacoEditor>
          </SplitArea>
        </Split>
        
      </SplitArea>
    </Split>
    
  </v-app>
</template>

<script>
// @ is an alias to /src
import MonacoEditor from 'monaco-editor-vue';
import FileExplorer from "../components/fileExplorer";
export default {
  name: 'Home',
  components: {
    FileExplorer,
    MonacoEditor
  },
data() {
  return {
    options: {
      //Monaco Editor Options
      minimap:true,
      automaticLayout: true
      
    },
    code:";code",
    selectedItem:null
  }
},
methods: {
  onChange(value) {
    //console.log(value);
    //send the value to the file
  },
  show(value){
    //console.log(value)
    //this.code = value
    //console.log(JSON.parse(JSON.stringify(value)))
    this.code = value
  }
}
}
</script>
<style lang="scss">
  .editor{
  
  }
  .gutter {
    background-color: #474747 !important;
  }
  .titlebar {
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  
</style>


