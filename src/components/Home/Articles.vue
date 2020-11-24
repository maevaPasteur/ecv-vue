<template>

    <section class="section-item section-articles">
        <h2>Toutes les news</h2>
        <ul>
            <li class="new" v-for="(article, index) in news" :key="'article-all-' + index">
                <Article :article="article"/>
            </li>
        </ul>
    </section>

</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import Article from "@/components/Home/Article";

    export default {
        name: 'Articles',
        components: {Article},
        computed: {
            ...mapState({
                news: state => state.news
            })
        },
        methods: {
            ...mapActions(['getNews'])
        },
        mounted() {
            if(!this.news.length) {
                this.getNews()
            }
        }
    }

</script>

<style lang="scss">

    .section-articles {
        ul {
            display: flex;
            flex-wrap: wrap;

            .new {
                width: calc((100% - 60px) / 4);
                margin-bottom: 40px;
                &:not(:nth-of-type(4n)) {
                    margin-right: 20px;
                }
            }

            .article-item {
                margin: 0;
                width: 100%;
            }
        }
    }

</style>