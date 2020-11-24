<template>
    <div class="page">
        <Header/>
        <main>
            <slot/>
        </main>
        <Footer/>
    </div>
</template>

<script>

    import Header from "@/components/Header";
    import Footer from "@/components/Footer";

    export default {
        components: {Header, Footer}
    }

</script>

<style lang="scss">

    main {
        position: relative;
        z-index: 1;
    }

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