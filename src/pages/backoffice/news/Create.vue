<template>

    <create
        :title="title"
        :route="route"
        :activeObject="article"
        :fields="fields"
        :states="states"
        :error="error"
        @create="create"
    />

</template>

<script>

    import Create from '@/components/Backoffice/Create'
    import {mapActions, mapState} from 'vuex'

    export default {
        components: { Create },
        data() {
            return {
                title: "Créer un article",
                route: { title: "Tous les articles", link: { name: 'news.index' } },
                fields: [
                    { label: "Titre", param: "title", type: "text" },
                    { label: "Date", param: "published", type: "date" },
                    { label: "Lien de l'image", param: "image", type: "image" },
                    { label: "Contenu", param: "content", type: "textarea" },
                    { label: "Les artistes taggés", param: "artistesId", type: "checkbox", options: 'artists' },
                ],
                article: {
                    title: '',
                    content: '',
                    published: '',
                    image: '',
                    artistesId: []
                },
                error: null
            }
        },
        computed: {
            ...mapState({
                artists: state => state.artists
            }),
            states() {
                return {
                    'artists': this.artists
                }
            }
        },
        methods: {
            ...mapActions(['getArtists', 'createNew']),
            create() {
                this.createNew(this.article).then(id => {
                    this.$router.push({name: 'news.show', params: { id: id } })
                }).catch(err => {
                    this.error = err
                })
            }
        },
        mounted() {
            if (!this.artists.length) {
                this.getArtists()
            }
        }
    }
</script>
