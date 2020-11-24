<template>
    <index v-if="news"
           :title="title"
           :link="link"
           :confirmSentence="confirmSentence"
           :cols="cols"
           :items="news"
           :routes="routes"
           :button="button"
           @remove="remove"
    />
</template>

<script>

    import Index from '@/components/Backoffice/Index';
    import {mapState, mapActions} from 'vuex';

    export default {
        components: {Index},
        data() {
            return {
                title: "Les articles",
                link: "Tous les articles",
                confirmSentence: 'Êtes-vous certain de vouloir supprimer cet article ?',
                cols: [
                    { title: "Titre", param: "title" },
                    { title: "Date", param: "published" },
                    { title: "Likes", param: "likes" },
                    { title: "Commentaires", param: "comments" }
                ],
                routes: { show: 'news.show', edit: 'news.edit' },
                button: {
                    title: "Créer un article",
                    link: { name: 'news.create' }
                }
            }
        },
        computed: {
            ...mapState({
                news: state => state.news
            })
        },
        methods: {
            ...mapActions(['getNews', 'deleteNew']),
            remove(id) {
                this.deleteNew(id);
            }
        },
        mounted() {
            if(!this.news.length) {
                this.getNews()
            }
        }
    }
</script>
