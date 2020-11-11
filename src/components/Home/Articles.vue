<template>

    <section class="section-item section-articles">
        <h2>Toutes les news</h2>
        <ul>
            <li class="new" v-for="(article, index) in news" :key="'article-all-' + index">
                <a :to="{name: 'article', params: { id: article.id }}">
                    <div class="image">
                        <img :src="article.image" :alt="article.title">
                        <span>{{ article.published }}</span>
                    </div>
                    <h3>{{ article.title }}</h3>
                </a>
            </li>
        </ul>
    </section>

</template>

<script>

    export default {
        name: 'Articles',
        computed: {
            news() {
                return this.$store.state.news
            }
        },
        mounted() {
            this.$store.dispatch('getNews')
        }
    }

</script>

<style lang="scss">

    .section-articles {

        a:hover {
            img {
                transform: scale(1.1);
            }
            .image span {
                transform: translate(-50%, -50%) scale(.95);
                opacity: 0;
            }
        }

        .image {
            position: relative;
            padding-bottom: 70%;
            margin-bottom: 20px;
            overflow: hidden;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                object-fit: cover;
                transition: transform ease-out 1s;
            }

            span {
                position: absolute;
                z-index: 1;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #fff;
                color: transparent;
                font-size: 35px;
                text-shadow: 0 0 10px #5a5a5a;
                transition: transform ease-out .3s, opacity ease-out .3s;
            }
        }

        ul {
            display: flex;
            flex-wrap: wrap;
        }

        li {
            width: calc((100% - 60px) / 4);
            margin-bottom: 40px;

            &:not(:nth-of-type(4n)) {
                margin-right: 20px;
            }
        }

    }

</style>