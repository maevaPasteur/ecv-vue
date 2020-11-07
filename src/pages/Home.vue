<template>
    <div>
        <main-article/>
        <concerts/>
        <artists/>
    </div>
</template>

<script>

    import MainArticle from "@/components/Home/MainArticle";
    import Concerts from "@/components/Home/Concerts";
    import Artists from "../components/Home/Artists";

    export default {
        name: 'Home',
        components: {
            MainArticle,
            Concerts,
            Artists
        }
    }
</script>

<style lang="scss">
    @import 'src/assets/scss/_styles.scss';
</style>