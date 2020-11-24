<template>

    <edit v-if="artist"
          :activeObject="artist"
          :title="title"
          :routes="routes"
          :fields="fields"
          :states="states"
          @save="save"
    />

</template>

<script>

    import Edit from '@/components/Backoffice/Edit';
    import {mapState, mapActions} from 'vuex';

    export default {
        components: {Edit},
        data() {
            return {
                id: this.$route.params.id,
                title: "Modifier l'artiste",
                routes: [
                    {title: "Tous les artistes", link: {name: 'artists.index'}},
                    {title: "Voir l'artiste", link: {name: 'artists.show', params: {id: this.$route.params.id}}}
                ],
                fields: [
                    {label: "Nom", param: "name", type: "text"},
                    {label: "Lien de l'avatar", param: "avatar", type: "image"},
                    {label: "Pays d'origine", param: "origin", type: "text"},
                    {label: "Description", param: "description", type: "textarea"},
                    {label: "Likes", param: "likes", type: "number"},
                    {label: "Le genre", param: "genreId", type: "radio", options: 'genres'}
                ]
            }
        },
        methods: {
            ...mapActions(['getGenres', 'getArtists', 'updateArtist']),
            save() {
                this.updateArtist(this.artist)
                    .then(() => this.$router.push({ name: 'artists.show', params: {id: this.id} }))
            }
        },
        computed: {
            ...mapState({
                artist(state) {
                    if (state.artists.length === 0) return {};
                    return state.artists.find(n => n.id === this.id);
                },
                genres: state => state.genres
            }),
            states() {
                return {
                    genres: this.genres
                }
            }
        },
        mounted() {
            if (!Object.keys(this.artist).length) {
                this.getArtists()
            }
            if (!this.genres.length) {
                this.getGenres()
            }
        }
    }


</script>
