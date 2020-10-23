<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
<style>
  #app{
    height:100vh;
    background-color: #1f2020;
  }
</style>
