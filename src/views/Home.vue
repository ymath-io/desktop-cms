<template>
  <v-app  class="home">
    <v-system-bar  color="primary darken-2"  window class="titlebar text-center" dark>
      <v-spacer></v-spacer>YMath - {{$store.state.file.name||""}}
      <v-spacer></v-spacer></v-system-bar>
    <v-system-bar  class="grey darken-4" window dark><v-breadcrumbs style="padding-top: 0;padding-bottom: 0"
                              dark
                              :items="pathBreakdown">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item style="margin-left:-10px;margin-right:-10px">
          <v-icon  color="amber darken-2" size="22" v-if="item.isDir">mdi-folder</v-icon>
          <v-icon color="primary darken-1" size="22" v-else>{{
              ((ext)=>{

                switch (ext) {
                  case 'md':
                    return 'mdi-language-markdown';
                  default:
                    return 'mdi-file';
                }
              })(item.extension)
            }}</v-icon>
          <span class="white--text">{{ item.text }}</span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <v-spacer></v-spacer>

    </v-system-bar>

    <Split style="background-color: #1f2020;height: 97vh">
      <SplitArea  :size="15">
        <file-explorer style="overflow: scroll;height: 100vh"/>
      </SplitArea>
      <SplitArea :size="$store.state.file.extension==='.md'?50:85">
        <v-col style="height:100%">
          <div v-if="$store.state.file.extension==='.md'">
            <v-row class="px-7">
              <v-col :cols="3">
                <v-text-field hint="Title" value="title here"></v-text-field>
              </v-col>
              <v-col :cols="1">
                <v-text-field type="number" label="index" :value="1"></v-text-field>
              </v-col>
            </v-row>
            <v-row class="px-10">
              <v-textarea
                  auto-grow
                  rows="2"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                  label="Description"
              ></v-textarea>
            </v-row>
          </div>


            <MonacoEditor

                v-model="$store.state.file.content"
                class="editor"
                theme="vs-dark"
                :language="((ext)=>{
                      switch (ext) {
                        case '.md':
                          return 'markdown';
                        case '.yml':
                          return 'yaml';
                        case '.yaml':
                          return 'yaml';
                        case '.vue':
                          return 'html';
                        case '.js':
                          return 'javascript';
                        case '.json':
                          return 'json';
                        case '.iml':
                          return 'xml';
                        case '.xml':
                          return 'xml';
                        default:
                          return 'text'
                      }
                    })($store.state.file.extension)"
                :options="options"
                @change="onChange"
                height="100%"
                :editorBeforeMount="registerLang"
                :editorMounted="onMount"
            />


        </v-col>

      </SplitArea>
      <SplitArea v-if="$store.state.file.extension==='.md'" class="pa-4" :size="35">
        <div style="color: azure" v-html="md.render($store.state.file.content)"></div>
      </SplitArea>
    </Split>

  </v-app>
</template>

<script>
// @ is an alias to /src
import MarkdownIt from "markdown-it"
const mk = require('markdown-it-katex');
var hljs = require('highlight.js')
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
md.use(mk, {"throwOnError" : false, "errorColor" : " #cc0000"});
import MonacoEditor from 'monaco-editor-vue';
const { spawn } = require("child_process");
import FileExplorer from "../components/fileExplorer";
import MarkdownItVue from 'markdown-it-vue';
const fs = require('fs');
const path = require('path')
export default {
  name: 'Home',
  components: {
    FileExplorer,
    MonacoEditor,
    MarkdownItVue
  },
data() {
  return {
    md,
    mdOptions:{
      html: true
    },
    options: {
      //Monaco Editor Options
      minimap:{
        enabled:true,
        renderCharacters: false,
        size:'fill'
      },
      automaticLayout: true,
      matchBrackets:"always",
      renderIndentGuides:true,
      dragAndDrop:true,
      suggest: {
        showWords:true
      },
      wordWrap:'on',
      suggestSelection:'first',
      cursorSmoothCaretAnimation:true,
      suggestOnTriggerCharacters:true,
      parameterHints:{
        cycle:true,
        enabled:true
      },
      scrollBeyondLastLine:false,

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
          extension:!(index!==array.length-1)?item.split('.')[1]:'',
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

  pre {
    background-color: rgba(255, 255, 255, 0.1) !important;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
  pre code {
    background-color: transparent !important;
  }
</style>


