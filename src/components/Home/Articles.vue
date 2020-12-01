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
                margin-bottom: 40px;

                @media screen and (min-width: 1025px) {
                    width: calc((100% - 60px) / 4);
                    &:not(:nth-of-type(4n)) {
                        margin-right: 20px;
                    }
                }

                @media screen and (max-width: 1024px) and (min-width: 761px) {
                    width: calc((100% - 40px) / 3);
                    &:not(:nth-of-type(3n)) {
                        margin-right: 20px;
                    }
                }

                @media screen and (max-width: 760px) and (min-width: 521px) {
                    width: calc((100% - 20px) / 2);
                    &:not(:nth-of-type(2n)) {
                        margin-right: 20px;
                    }
                }

                @media screen and (max-width: 520px) {
                    width: 100%;
                    margin-bottom: 20px;
                }
            }

            .article-item {
                margin: 0;
                width: 100%;
            }
        }
    }

</style>