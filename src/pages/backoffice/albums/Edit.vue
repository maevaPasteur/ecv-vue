<template>

    <edit
            :activeObject="album"
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
                    { title: "Tous les albums", link: { name: 'albums.index' } },
                    { title: "Voir l'album", link: { name: 'albums.show', params: { id: this.$route.params.id } } }
                ],
                fields: [
                    {label: "Nom", param: "name", type: "text"},
                    {label: "Date", param: "released", type: "number"},
                    {label: "Tracks", param: "tracks", type: "number"},
                    {label: "Cover", param: "cover", type: "image"},
                    {label: "Artiste", param: "artistId", type: "radio", options: 'artists'}
                ],
                showLoader: false
            }
        },
        methods: {
            ...mapActions(['getAlbums', 'getArtists', 'updateAlbum']),
            save() {
                this.showLoader = true;
                this.updateAlbum(this.album)
                    .then(() => this.$router.push({name: 'albums.show', params: {id: this.id}}))
            }
        },
        computed: {
            ...mapState({
                album(state) {
                    if (state.albums.length === 0) return {};
                    return state.albums.find(n => n.id === this.id);
                },
                artists: state => {
                    if(!state.artists || !state.artists.length) return {};
                    return state.artists.sort((a,b) => a.name < b.name ? -1 : 1)
                }
            }),
            states() {
                return {
                    artists: this.artists
                }
            }
        },
        mounted() {
            if(!Object.keys(this.album).length) {
                this.getAlbums()
            }
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }

</script>
