<template>
    <div>
        <main-articles/>
        <top-artists/>
        <concerts/>
        <artists/>
        <articles/>
    </div>
</template>

<script>

    import MainArticles from "@/components/Home/MainArticles";
    import Concerts from "@/components/Home/Concerts";
    import Artists from "@/components/Home/Artists";
    import TopArtists from "@/components/Home/TopArtists";
    import Articles from "@/components/Home/Articles";

    export default {
        name: 'Home',
        components: {
            MainArticles,
            Concerts,
            Artists,
            TopArtists,
            Articles
        }
    }
</script>

<style lang="scss">
    @import 'src/assets/scss/_styles.scss';
</style>