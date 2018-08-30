<template>
  <div id="app">

    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>

  import FooterGuide from "./components/FooterGuide/FooterGuide"

  export default {
    name: 'App',

    components:{
      FooterGuide
    }
  }


</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../static/css/reset.css"
</style>
