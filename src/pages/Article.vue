<template>
    <div class="page-content">
        <section class="section-item detail-article" v-if="article">
            <h1>{{ article.title }}</h1>
            <span class="date">{{ article.published }}</span>
            <div class="image">
                <img :src="article.image" :alt="article.title">
            </div>
            <p class="content">{{article.content}}</p>
            <div class="comments">
                <p>Commentaires</p>
                <ul v-if="article.comments && article.comments.length">
                    <li v-for="comment in article.comments" :key="'comment-' + comment.id">
                        <img :src="comment.avatar" :alt="comment.username">
                        <div>
                            <p>{{ comment.username }}</p>
                            <p>{{ comment.message }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        name: 'Article',
        data() {
            return {
                id: Number(this.$route.params.id)
            }
        },
        computed: {
            article() {
                return this.$store.state.news.find(e => e.id === this.id)
            }
        },
        mounted() {
            this.$store.dispatch('getNews');
        }
    }

</script>

<style lang="scss">

    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

    .detail-article {

        .image {
            position: relative;
            padding-bottom: 40%;
            margin-bottom: 40px;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .date {
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #fff;
            color: transparent;
            font-size: 2.5rem;
            margin-bottom: 20px;
            display: block;
        }

        .content {
            white-space: pre-line;
            line-height: 1.5;
            font-family: 'Roboto', sans-serif;
            font-weight: 100;
            font-size: 16px;
        }

        .comments {
            margin-top: 40px;
            padding-top: 20px;
            border-top: solid 1px #444;

            & > p {
                margin-bottom: 20px;
            }

            ul {
                font-family: 'Roboto', sans-serif;
                font-weight: 100;
                font-size: 16px;
            }
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 20px;
            }
            li {
                display: flex;
                margin-bottom: 20px;
                width: fit-content;
                background-color: #fff;
                padding: 5px 20px 5px 10px;
                border-radius: 10px;
                color: #333;
                position: relative;

                &:after {
                    content: '';
                    display: block;
                    background-color: #fff;
                    width: 10px;
                    height: 10px;
                    transform: rotate(45deg);
                    position: absolute;
                    left: 25px;
                    bottom: -5px;
                }

                div > p:first-of-type {
                    opacity: .5;
                    font-size: 14px;
                }
            }
        }

    }

</style>

