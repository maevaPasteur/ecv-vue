<template>

    <create
            :title="title"
            :route="route"
            :activeObject="artist"
            :fields="fields"
            :states="states"
            :error="error"
            @create="create"
    />

</template>

<script>

    import Create from '@/components/Backoffice/Create'
    import {mapState, mapActions} from 'vuex'

    export default {
        components: {Create},
        data() {
            return {
                title: "Ajouter un artiste",
                route: {title: "Tous les artistes", link: {name: 'artists.index'}},
                fields: [
                    {label: "Nom", param: "name", type: "text"},
                    {label: "Lien de l'avatar", param: "avatar", type: "image"},
                    {label: "Pays d'origine", param: "origin", type: "text"},
                    {label: "Description", param: "description", type: "textarea"},
                    {label: "Likes", param: "likes", type: "number"},
                    {label: "Le genre", param: "genreId", type: "radio", options: 'genres'}
                ],
                artist: {
                    name: '',
                    avatar: '',
                    origin: '',
                    genreId: '',
                    likes: 0,
                    description: ''
                },
                error: null
            }
        },
        computed: {
            ...mapState({
                genres: state => state.genres
            }),
            states() {
                return {
                    'genres': this.genres
                }
            }
        },
        methods: {
            ...mapActions(['getGenres', 'createArtist']),
            create() {
                this.createArtist(this.artist).then(id => {
                    this.$router.push({name: 'artists.show', params: {id: id}})
                }).catch(err => {
                    this.error = err
                })
            }
        },
        mounted() {
            if (!this.genres.length) {
                this.getGenres()
            }
        }
    }
</script>
