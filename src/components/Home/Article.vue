<template>

    <router-link :to="{name: 'article', params: { id: article.id }}" class="article-item">
        <div class="image">
            <img :src="article.image" :alt="article.title">
            <span>{{ article.published | date }}</span>
        </div>
        <h3>{{ article.title }}</h3>
    </router-link>

</template>

<script>
    export default {
        name: 'Article',
        props: {
            article: Object
        }
    }
</script>

<style lang="scss">

    .article-item {
        width: calc((100% - 60px) / 4);
        margin-bottom: 40px;

        &:hover {
            img {
                transform: scale(1.1);
            }
            .image span {
                transform: translate(-50%, -50%) scale(.95);
                opacity: 0;
            }
        }

        &:not(:nth-of-type(4n)) {
            margin-right: 20px;
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
    }

</style>