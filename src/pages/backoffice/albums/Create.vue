<template>

    <create
            :title="title"
            :route="route"
            :activeObject="album"
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
        components: {Create},
        data() {
            return {
                title: "Ajouter un album",
                route: {title: "Tous les albums", link: {name: 'albums.index'}},
                fields: [
                    {label: "Nom", param: "name", type: "text"},
                    {label: "Date", param: "released", type: "number"},
                    {label: "Tracks", param: "tracks", type: "number"},
                    {label: "Cover", param: "cover", type: "image"},
                    {label: "Artiste", param: "artistId", type: "radio", options: 'artists'}
                ],
                album: {
                    name: '',
                    released: 2020,
                    tracks: 0,
                    cover: '',
                    artistId: null
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
            ...mapActions(['getArtists', 'createAlbum']),
            create() {
                this.createAlbum(this.album).then(id => {
                    this.$router.push({name: 'albums.show', params: {id: id}})
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
