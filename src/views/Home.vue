<template>
  <div class="home">
    <Split style="height: 100vh;">
      <SplitArea :size="25">
        File list here
      </SplitArea>
      <SplitArea :size="75">
        <Split direction="vertical">
          <SplitArea :size="75">
            <MonacoEditor
                    v-model="code"
                    class="editor"
                    theme="vs"
                    language="scheme"
                    :options="options"
                    @change="onChange"
            ></MonacoEditor>
          </SplitArea>
          <SplitArea :size="25">
          
          </SplitArea>
        </Split>
        
      </SplitArea>
    </Split>
    
  </div>
</template>

<script>
// @ is an alias to /src
import MonacoEditor from 'monaco-editor-vue';
export default {
  name: 'Home',
  components: {
    MonacoEditor
  },
data() {
  return {
    options: {
      //Monaco Editor Options
      minimap:true,
      automaticLayout: true
      
    },
    code:"(define a 5)\n" +
            "(define (repeated method count)\n" +
            " (lambda (x)\n" +
            " (if (= count 0) \n" +
            "    x \n" +
            "(method ((repeated method (- count 1)) x))))) ; do for the countth time, has been done count-1 times\n" +
            "\n" +
            "(define (last lyst)\n" +
            "(car ((repeated cdr (- (length lyst) 1)) lyst))\n" +
            ")\n"
  }
},
methods: {
  onChange(value) {
    //console.log(value);
    //send the value to the file
  }
}
}
</script>
<style lang="scss">
  .editor{
    width: calc(100% -  100px);
  }
</style>


