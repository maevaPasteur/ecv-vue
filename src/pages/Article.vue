<template>
    <section v-if="article">
        <h1>{{ article.title }}</h1>
    </section>
</template>

<script>

    import axios from 'axios';

    export default {
        name: 'Article',
        data() {
            return {
                article: null
            }
        },
        mounted() {

            // Récupérer les articles
            axios
                .get('news')
                .then(response => {

                    const articles = response.data;
                    if(articles) {
                        console.log(articles)
                    }
                })
        }
    }

</script>