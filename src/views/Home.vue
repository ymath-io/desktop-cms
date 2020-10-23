<template>
  <v-app  class="home">
    <v-system-bar  color="primary"  class="titlebar text-center" dark>
      <v-spacer></v-spacer>Scheme It - {{$store.state.file.name||""}}
      <v-spacer></v-spacer></v-system-bar>
    <v-system-bar  class="grey darken-4" window dark><v-breadcrumbs style="padding-top: 0;padding-bottom: 0"
                              dark
                              :items="pathBreakdown">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item style="margin-left:-10px;margin-right:-10px"
        >
      
          <v-avatar v-if="!item.isDir" >
            <v-img max-height="15px"  max-width="15px"  src="./../../public/file-icons/racket-logo.svg"/>
          </v-avatar> <span class="white--text">{{ item.text }}</span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
       <v-btn @click="executeFile"
              icon
              color="green"
      >
        <v-icon color="green" style="margin-right: 0">mdi-play</v-icon>
      </v-btn>
      <v-btn
             icon
             color="red"
      >
        <v-icon color="red" style="margin-right: 0">mdi-stop</v-icon>
      </v-btn>
    </v-system-bar>
    
    <Split style="background-color: #1f2020;height: 97vh">
      <SplitArea  :size="15">
        <file-explorer style="overflow: scroll;height: 100vh"/>
      </SplitArea>
      <SplitArea :size="85">
        <Split direction="vertical">
          <SplitArea :size="75">
            <MonacoEditor
                    
                    v-model="$store.state.file.content"
                    class="editor"
                    theme="vs-dark"
                    language="scheme"
                    :options="options"
                    @change="onChange"
                    height="100%"
                    :editorBeforeMount="registerLang"
                    :editorMounted="onMount"
            ></MonacoEditor>
          </SplitArea>
          <SplitArea :size="20">
            <MonacoEditor
          
                    v-model="outputText"
                    class="editor"
                    theme="vs-dark"
                    language="scheme"
                    :options="{...options, readOnly:true}"
                    
                    height="100%"
            ></MonacoEditor>
          </SplitArea>
          <SplitArea :size="5">
            <MonacoEditor  theme="vs-dark" language="scheme" :options="{
              lineNumbers:false
            }" ></MonacoEditor>
          </SplitArea>
        </Split>
        
      </SplitArea>
    </Split>
    
  </v-app>
</template>

<script>
// @ is an alias to /src
import MonacoEditor from 'monaco-editor-vue';
const { spawn } = require("child_process");
import FileExplorer from "../components/fileExplorer";
const fs = require('fs');
const path = require('path')
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
      //minimap:true,
      automaticLayout: true,
      matchBrackets:"always",
      //renderIndentGuides:true,
      dragAndDrop:true,
      suggest: {
        showWords:true
      },
      suggestOnTriggerCharacters:true,
      parameterHints:{
        cycle:true,
        enabled:true
      },
      scrollBeyondLastLine:false,
      statusBar:{
        visible:true
      }
      
    },
    code:";code",
    selectedItem:null,
    outputText:""
  }
},
methods: {
  onChange(value) {
    //console.log(value);
    //send the value to the file
    fs.writeFileSync(this.$store.state.file.path,value)
    
  },
  show(value){
    //console.log(value)
    //this.code = value
    //console.log(JSON.parse(JSON.stringify(value)))
    this.code = value
  },
  registerLang(monaco){
    //console.log(monaco)
    monaco.languages.registerCompletionItemProvider('scheme', {
      provideCompletionItems: () => {
        var suggestions = [{
          label: 'simpleText',
          kind: monaco.languages.CompletionItemKind.Text,
          insertText: 'simpleText'
        }, {
          label: 'testing',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'testing(${1:condition})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
        }, {
          label: 'if-then-else',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'if (${1:condition}) {',
            '\t$0',
            '} else {',
            '\t',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'If-Else Statement'
        }];
        return { suggestions: suggestions };
      }
    });
    
    
    
  },
  executeFile(){
    this.outputText = "";
    const path = this.$store.state.file.path
    if (!path) return false;
    const ls = spawn(`racket`,[`-i`,`-e`,`${this.$store.state.file.content}`]);
    const vapp = this;
    
    ls.stdout.on("data", data => {
      //console.log(`stdout: ${data}`);
      vapp.outputText += data
    });
  
    ls.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
      vapp.outputText += data
    });
  
    ls.on('error', (error) => {
      console.log(`error: ${error.message}`);
      //vapp.outputText += error.message;
    });
  
    ls.on("close", code => {
      console.log(`child process exited with code ${code}`);
    });
    // racket -i -e "$(cat test.rkt)(display \"\n\")" opens a REPL. We need to pipe this somehow into the bottom editor.
    
  },
  onMount(monaco,editor){
   // console.log(editor)
  }
},
  computed:{
    pathBreakdown(){
      return (this.$store.state.file.path||"").split("/").map((item,index,array)=> {
        //console.log(index===array.length-1)
        return {text: item,
          isDir:index!==array.length-1}
      }).splice(1)
      
      
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
  .home{
    height: 100%;
    background-color: #1f2020;
  }
</style>


