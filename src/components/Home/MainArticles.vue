<template>
    <section class="main-article" v-if="news && news.length">
        <flickity class="main-slider" ref="slider" :options="flickityOptions" @init="initSlider">
            <div class="slide" v-for="article in news" :key="article.title">
                <img :src="article.image" :alt="article.title"/>
                <router-link :to="{name: 'article', params: { id: article.id }}" class="container">
                    <h2>{{ article.title }}</h2>
                    <p>{{ article.published | date }}</p>
                </router-link>
            </div>
        </flickity>
    </section>
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import Flickity from 'vue-flickity'

    export default {
        name: 'MainArticles',
        components: {Flickity},
        data() {
            return {
                flickityOptions: {
                    initialIndex: Math.floor(Math.random() * Math.floor(5)),
                    prevNextButtons: false,
                    pageDots: true
                }
            }
        },
        computed: {
            ...mapState({
                news(state) {
                    if (state.news.length === 0) return {};
                    return state.news.slice(0, 5)
                },
                all_news: state => state.news
            })
        },
        methods: {
            ...mapActions(['getNews']),
            initSlider() {
                window.addEventListener('resize', () => {
                    this.$refs.slider.resize()
                })
            }
        },
        mounted() {
            if(!Object.keys(this.all_news).length) {
                this.getNews();
            }
        }
    }

</script>

<style lang="scss">

    .main-article {
        height: 100vh;
        position: relative;
        width: 100%;

        .flickity-enabled.is-draggable .flickity-viewport {
            cursor: auto;
        }

        .main-slider {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
        }

        .flickity-viewport {
            width: 100%;
            height: 100%;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            z-index: 1;
        }

        .container {
            z-index: 2;
            position: absolute;
            left: 50px;
            bottom: 50px;
            font-size: 60px;
            max-width: 500px;
            display: block;
        }

        h2 {
            text-shadow: 0 0 10px #5a5a5a;
        }

        p {
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #fff;
            padding-top: 20px;
            margin-top: 10px;
            position: relative;

            &:before {
                content: '';
                display: block;
                top: 0;
                left: 0;
                width: 100px;
                height: 4px;
                background-color: #fff;
                position: absolute;
                transform-origin: left;
                transition: transform ease-out .3s .5s;
            }
        }

        .flickity-page-dots {
            right: 50px;
            bottom: 50px;
            z-index: 2;
            display: flex;
            justify-content: flex-end;
        }

        .dot {
            width: 18px;
            height: 18px;
            margin: 0;
            position: relative;
            opacity: 1;
            background: none;

            &:after {
                content: '';
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #fff;
                top: 7px;
                left: 7px;
                display: block;
                position: absolute;
            }

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: solid 1px #fff;
                transition: transform ease-in-out .3s;
            }

            &:not(.is-selected) {
                opacity: .5;
                &:before {
                    transform: scale(0);
                }
            }

            &:not(:last-of-type) {
                margin-right: 20px;
            }


            &:hover {
                opacity: 1;
            }
        }

        h2, p {
            transition: opacity cubic-bezier(0.02, 0.01, 0.25, 1.03) .5s .3s, transform cubic-bezier(0.02, 0.01, 0.25, 1.03) .5s .3s;
        }

        .slide {
            width: 100%;
            height: 100%;

            &:not(.is-selected) {
                transition-delay: 0s;
                h2 {
                    opacity: 0;
                    transform: translateY(10px);
                }
                p {
                    opacity: 0;
                    transform: translateY(-10px);
                    &:before {
                        transform: scale(0, 1);
                    }
                }
            }
        }
    }

</style>