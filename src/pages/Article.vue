<template>
    <div class="page-content">
        <article-content/>
        <suggestions/>
    </div>
</template>

<script>

    import Suggestions from "../components/Article/Suggestions";
    import ArticleContent from "../components/Article/ArticleContent";

    export default {
        name: 'Article',
        components: {
            Suggestions,
            ArticleContent
        }
    }

</script>
