<template>

    <index v-if="albums"
           :title="title"
           :link="link"
           :confirmSentence="confirmSentence"
           :cols="cols"
           :items="albums"
           :routes="routes"
           :button="button"
           :states="states"
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
                title: "Les albums",
                link: "Tous les albums",
                confirmSentence: 'Êtes-vous certain de vouloir supprimer cet album ?',
                cols: [
                    { title: "Nom", param: "name", isAlbum: true },
                    { title: "Date", param: "released" },
                    { title: "Tracks", param: "tracks" },
                    { title: "Artiste", param: "artistId" }
                ],
                routes: { show: 'albums.show', edit: 'albums.edit' },
                button: {
                    title: "Ajouter un album",
                    link: { name: 'albums.create' }
                }
            }
        },
        computed: {
            ...mapState({
                albums: state => state.albums,
                artists: state => state.artists
            }),
            states() {
                return {
                    artists: this.artists
                }
            }
        },
        methods: {
            ...mapActions(['getAlbums', 'getArtists', 'deleteAlbum']),
            remove(id) {
                this.deleteAlbum(id);
            }
        },
        mounted() {
            if(!this.artists.length) {
                this.getArtists()
            }
            if(!this.albums.length) {
                this.getAlbums()
            }
        }
    }
</script>
