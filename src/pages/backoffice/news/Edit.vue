<template>
    <edit v-if="article"
        :activeObject="article"
        :title="title"
        :routes="routes"
        :fields="fields"
        :states="states"
        :showLoader="showLoader"
        @save="save"
    />
</template>

<script>

    import Edit from '@/components/Backoffice/Edit';
    import {mapState, mapActions} from 'vuex';

    export default {
        components: { Edit },
        data() {
            return {
                id: this.$route.params.id,
                title: "Modifier l'article",
                routes: [
                    { title: "Tous les articles", link: { name: 'news.index' } },
                    { title: "Voir l'article", link: { name: 'news.show', params: { id: this.$route.params.id } } }
                ],
                fields: [
                    { label: "Titre", param: "title", type: "text" },
                    { label: "Date", param: "published", type: "date" },
                    { label: "Lien de l'image", param: "image", type: "image" },
                    { label: "Contenu", param: "content", type: "textarea" },
                    { label: "Les artistes taggés", param: "artistesId", type: "checkbox", options: 'artists' }
                ],
                showLoader: false
            }
        },
        methods: {
            ...mapActions(['getNews', 'getArtists', 'updateNew']),
            save() {
                this.showLoader = true;
                this.updateNew(this.article)
                    .then(() => this.$router.push({name: 'news.show', params: {id: this.id}}))
            }
        },
        computed: {
            ...mapState({
                article(state) {
                    if (state.news.length === 0) return {};
                    return state.news.find(n => n.id === this.id);
                },
                artists: state => state.artists
            }),
            states() {
                return {
                    artists: this.artists
                }
            }
        },
        mounted() {
            if(!Object.keys(this.article).length) {
                this.getNews()
            }
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }

</script>
