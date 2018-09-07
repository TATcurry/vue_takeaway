<template>
  <div id="app">

    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>

  import FooterGuide from "./components/FooterGuide/FooterGuide"
  import {mapActions} from "vuex"

  export default {
    name: 'App',

    components:{
      FooterGuide
    },
    mounted(){
      //this.$store.dispatch("getAddress")
      this.getAddress()
      this.getUserInfo()
    },
    methods:{
      ...mapActions(['getAddress','getUserInfo'])
    }
  }


</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "../static/css/reset.css"
</style>
