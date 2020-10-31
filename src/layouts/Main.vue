<template>
  <div class="page">
    <header>Header</header>
    <main>
      <transition name="fade">
        <slot/>
      </transition>
    </main>
    <footer>Footer</footer>
  </div>
</template>

<script>

export default {
  components: {}
}

</script>

<style>
  /*
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-leave-to {
    position: absolute;
  }

   */
</style>