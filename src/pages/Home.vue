<template>
    <div>
        <main-article/>
        <top-artists/>
        <concerts/>
        <artists/>
    </div>
</template>

<script>

    import MainArticle from "@/components/Home/MainArticle";
    import Concerts from "@/components/Home/Concerts";
    import Artists from "../components/Home/Artists";
    import TopArtists from "../components/Home/TopArtists";

    export default {
        name: 'Home',
        components: {
            MainArticle,
            Concerts,
            Artists,
            TopArtists
        }
    }
</script>

<style lang="scss">
    @import 'src/assets/scss/_styles.scss';
</style>