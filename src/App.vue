<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    computed: {
      layout() {
        return this.$route.meta && this.$route.meta.layout ? this.$route.meta.layout + '-layout' : 'default-layout'
      }
    },
    methods: {
      ...mapActions(['tryLogin'])
    },
    mounted() {
      if(localStorage.getItem('token')) {
        this.tryLogin()
      }
    }
  }

</script>



