<template>

    <create
        :title="title"
        :route="route"
        :activeObject="concert"
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
                title: "Ajouter un concert",
                route: {title: "Tous les concerts", link: {name: 'concerts.index'}},
                fields: [
                    {label: "Lieu du concert", param: "name", type: "text"},
                    {label: "Date", param: "date", type: "date"},
                    {label: "Les artistes taggés", param: "artistId", type: "radio", options: 'artists'},
                ],
                concert: {
                    name: '',
                    date: '',
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
            ...mapActions(['getArtists', 'createConcert']),
            create() {
                this.createConcert(this.concert).then(id => {
                    this.$router.push({name: 'concerts.show', params: {id: id}})
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
