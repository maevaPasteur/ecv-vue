<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

  export default {
    computed: {
      layout() {
        return this.$route.meta && this.$route.meta.layout ? this.$route.meta.layout + '-layout' : 'default-layout'
      }
    }
  }

</script>


