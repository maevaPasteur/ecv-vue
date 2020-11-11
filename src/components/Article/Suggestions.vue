<template>
    <section class="section-item section-suggestions">
        <h2>Suggestions</h2>
        <flickity v-if="news && news.length" class="suggestion-articles" :options="flickityOptions">
            <div class="slide" v-for="article in news" :key="article.title">
                <router-link :to="{ name: 'article', params: { id: article.id }}">
                    <img :src="article.image" :alt="article.title"/>
                    <div>
                        <h3>{{ article.title }}</h3>
                        <p>{{ article.published }}</p>
                    </div>
                </router-link>
            </div>
        </flickity>
    </section>
</template>

<script>

    import Flickity from 'vue-flickity';

    export default {
        name: 'Suggestion',
        components: {Flickity},
        data() {
            return {
                flickityOptions: {
                    prevNextButtons: true,
                    pageDots: false,
                    contain: true,
                    wrapAround: true
                }
            }
        },
        computed: {
            news() {
                return this.$store.state.news.slice(0, 10)
            }
        },
        mounted() {
            this.$store.dispatch('getNews')
        }
    }

</script>

<style lang="scss">

    .section-suggestions {
        .slide {
            width: calc((100% - 40px) / 3);
            margin-right: 20px;
            font-size: 25px;
            text-align: left;

            a {
                display: block;
                position: relative;
                padding-bottom: 100%;
                overflow: hidden;

                &:hover img {
                    transform: scale(1.05);
                }
            }

            img {
                object-fit: cover;
                transition: transform ease-out 1s;
            }

            div, img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            div {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
            }

            h3, p {
                padding: 0 20px;
                width: calc(100% - 40px);
            }

            h3 {
                text-shadow: 0 0 10px #5a5a5a;
            }

            p {
                padding-bottom: 20px;
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #fff;
                color: transparent;
                font-size: 35px;
                margin-top: 10px;
                text-shadow: 0 0 10px #5a5a5a;
            }
        }
    }

</style>